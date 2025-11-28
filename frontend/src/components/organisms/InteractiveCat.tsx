"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Fish, Droplets, Moon, Heart } from "lucide-react"

interface InteractiveCatProps {
  foodLevel: number
  waterLevel: number
  onConsumeFood: () => void
  onConsumeWater: () => void
}

type CatState = "idle" | "walking" | "running" | "eating" | "drinking" | "sleeping" | "sitting" | "grooming"

export function InteractiveCat({ foodLevel, waterLevel, onConsumeFood, onConsumeWater }: InteractiveCatProps) {
  // --- State ---
  const [catState, setCatState] = useState<CatState>("idle")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left

  // Needs (0-100)
  const [hunger, setHunger] = useState(0)
  const [thirst, setThirst] = useState(0)
  const [energy, setEnergy] = useState(100) // Starts full
  const [happiness, setHappiness] = useState(50)

  const [message, setMessage] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)

  const controls = useAnimation()
  const catRef = useRef<HTMLDivElement>(null)

  // Refs for current state to avoid closure staleness in async loops
  const stateRef = useRef(catState)
  const foodRef = useRef(foodLevel)
  const waterRef = useRef(waterLevel)

  // Sync refs
  useEffect(() => { stateRef.current = catState }, [catState])
  useEffect(() => { foodRef.current = foodLevel }, [foodLevel])
  useEffect(() => { waterRef.current = waterLevel }, [waterLevel])

  // --- Initialization ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({
        x: window.innerWidth / 2 - 50,
        y: window.innerHeight - 120
      })

      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY })
      }
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // --- Needs Decay & Regeneration ---
  useEffect(() => {
    const interval = setInterval(() => {
      setHunger(prev => Math.min(100, prev + 2)) // Slower hunger
      setThirst(prev => Math.min(100, prev + 3))

      // Energy logic
      if (stateRef.current === "sleeping") {
        setEnergy(prev => Math.min(100, prev + 5)) // Recover energy
      } else {
        setEnergy(prev => Math.max(0, prev - 1)) // Drain energy
      }

      // Happiness decay
      setHappiness(prev => Math.max(0, prev - 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // --- Blinking Logic ---
  useEffect(() => {
    const blinkLoop = () => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 200)
      setTimeout(blinkLoop, Math.random() * 3000 + 2000)
    }
    const timeout = setTimeout(blinkLoop, 2000)
    return () => clearTimeout(timeout)
  }, [])

  // --- Movement Helpers ---
  const moveCat = useCallback(async (targetX: number, targetY: number, run = false) => {
    setCatState(run ? "running" : "walking")
    setDirection(targetX > position.x ? 1 : -1)

    const speed = run ? 250 : 100 // pixels per second
    const dist = Math.abs(targetX - position.x)
    const duration = dist / speed

    await controls.start({
      x: targetX,
      y: targetY,
      transition: { duration: duration, ease: "linear" }
    })

    setPosition({ x: targetX, y: targetY })
    setCatState("idle")
  }, [position.x, controls])

  const moveToTarget = useCallback(async (action: "eating" | "drinking") => {
    // Guard: Check if empty using Refs
    if ((action === "eating" && foodRef.current <= 0) || (action === "drinking" && waterRef.current <= 0)) {
      setMessage(action === "eating" ? "No Food!" : "No Water!")
      setCatState("idle")
      return
    }

    setCatState("running")
    const targetX = window.innerWidth - 120
    const targetY = window.innerHeight / 2

    setDirection(targetX > position.x ? 1 : -1)

    const speed = 250
    const dist = Math.abs(targetX - position.x)
    const duration = dist / speed

    await controls.start({
      x: targetX,
      y: targetY,
      transition: { duration: duration, ease: "linear" }
    })

    setPosition({ x: targetX, y: targetY })
    setCatState(action)
    setMessage(null)

    // Consume
    setTimeout(() => {
      if (action === "eating") {
        onConsumeFood()
        setHunger(0)
        setMessage("Yummy!")
      } else {
        onConsumeWater()
        setThirst(0)
        setMessage("Refreshing!")
      }
      setEnergy(prev => Math.min(100, prev + 10)) // Eating gives energy

      setTimeout(() => {
        setMessage(null)
        setCatState("grooming")
        setTimeout(() => setCatState("idle"), 2000)
      }, 1500)
    }, 3000)
  }, [position.x, controls, onConsumeFood, onConsumeWater])

  // --- Main Brain Loop ---
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const decideNextAction = async () => {
      if (typeof window === "undefined") return

      const current = stateRef.current

      // Don't interrupt important states
      if (current === "eating" || current === "drinking" || current === "running" || current === "walking") {
        timeoutId = setTimeout(decideNextAction, 1000)
        return
      }

      // 1. Sleep if tired
      if (energy < 20 && current !== "sleeping") {
        setMessage("So tired...")
        await new Promise(r => setTimeout(r, 1000))
        setMessage(null)
        setCatState("sleeping")
        timeoutId = setTimeout(decideNextAction, 10000) // Sleep for at least 10s
        return
      }

      // 2. Wake up if full energy
      if (current === "sleeping") {
        if (energy >= 90 || hunger > 80 || thirst > 80) {
          setCatState("idle") // Wake up
          setMessage("Good morning!")
          await new Promise(r => setTimeout(r, 1000))
          setMessage(null)
        } else {
          // Keep sleeping
          timeoutId = setTimeout(decideNextAction, 5000)
          return
        }
      }

      // 3. Needs (Hunger/Thirst)
      if (hunger > 60) {
        setMessage("Food!")
        await new Promise(r => setTimeout(r, 3000))
        // Check Ref for fresh value
        if (foodRef.current > 0) {
          await moveToTarget("eating")
        } else {
          setMessage("No Food!")
        }
        timeoutId = setTimeout(decideNextAction, 2000)
        return
      }

      if (thirst > 60) {
        setMessage("Water!")
        await new Promise(r => setTimeout(r, 3000))
        // Check Ref for fresh value
        if (waterRef.current > 0) {
          await moveToTarget("drinking")
        } else {
          setMessage("No Water!")
        }
        timeoutId = setTimeout(decideNextAction, 2000)
        return
      }

      // 4. Random Behavior
      const roll = Math.random()
      if (roll < 0.3) {
        setCatState("idle") // Just chill and watch mouse
        timeoutId = setTimeout(decideNextAction, 3000)
      } else if (roll < 0.5) {
        setCatState("sitting")
        timeoutId = setTimeout(decideNextAction, 4000)
      } else if (roll < 0.6) {
        setCatState("grooming")
        timeoutId = setTimeout(decideNextAction, 3000)
      } else {
        // Walk somewhere
        const targetX = Math.random() * (window.innerWidth - 100)
        const targetY = window.innerHeight - 120
        await moveCat(targetX, targetY)
        decideNextAction()
      }
    }

    timeoutId = setTimeout(decideNextAction, 1000)
    return () => clearTimeout(timeoutId)
  }, [energy, hunger, thirst, moveCat, moveToTarget]) // Removed foodLevel/waterLevel from deps to rely on Refs

  // --- Interaction ---
  const handleInteraction = async () => {
    if (catState === "sleeping") {
      setCatState("idle") // Wake up
      setMessage("Huh?")
      setEnergy(prev => Math.max(0, prev - 10)) // Waking up costs energy
    } else {
      setMessage("Purr~")
      setHappiness(prev => Math.min(100, prev + 10))

      // Jump
      await controls.start({
        y: position.y - 100,
        transition: { duration: 0.3, ease: "easeOut" }
      })
      await controls.start({
        y: position.y,
        transition: { duration: 0.3, ease: "easeIn" }
      })
    }
    setTimeout(() => setMessage(null), 2000)
  }

  // --- Visuals ---
  // Calculate head rotation to look at mouse
  const catCenterX = position.x + 40
  const catCenterY = position.y + 32
  const angle = Math.atan2(mousePos.y - catCenterY, mousePos.x - catCenterX) * (180 / Math.PI)
  // Clamp angle to avoid breaking neck
  const clampedAngle = Math.max(-30, Math.min(30, angle))
  // Only look if idle/sitting
  const lookAngle = (catState === "idle" || catState === "sitting") ? clampedAngle : 0

  const bounceVariant = {
    idle: { y: 0 },
    walking: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.4 } },
    running: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 0.2 } },
    sitting: { scaleY: 0.9, y: 5 },
    grooming: { rotate: [0, 5, 0, -5, 0], transition: { repeat: Infinity, duration: 1 } },
    eating: { rotate: 10, y: 5 },
    drinking: { rotate: 10, y: 5 },
    sleeping: { scaleY: 0.7, y: 15, opacity: 0.9 }
  }

  return (
    <motion.div
      animate={controls}
      initial={position}
      className={`fixed ${['eating', 'drinking', 'running'].includes(catState) ? 'z-40' : 'z-0'} cursor-pointer`}
      onClick={handleInteraction}
      style={{ width: 80, height: 64 }}
    >
      {/* Status Bubbles */}
      <AnimatePresence>
        {(hunger > 70 || thirst > 70 || energy < 30 || happiness < 30) && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -30 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-4 left-0 bg-white border-2 border-black rounded-xl p-2 flex gap-1 shadow-md z-50"
          >
            {hunger > 70 && <Fish className="w-4 h-4 text-orange-500 animate-pulse" />}
            {thirst > 70 && <Droplets className="w-4 h-4 text-blue-500 animate-pulse" />}
            {energy < 30 && <Moon className="w-4 h-4 text-purple-500 animate-pulse" />}
            {happiness < 30 && <Heart className="w-4 h-4 text-red-500 animate-pulse" />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -40 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-8 left-0 bg-white border-2 border-black rounded-2xl px-3 py-1 shadow-lg z-50 whitespace-nowrap"
          >
            <p className="text-xs font-bold text-black">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleep Zzz */}
      <AnimatePresence>
        {catState === "sleeping" && (
          <motion.div
            initial={{ opacity: 0, y: 0, x: 10 }}
            animate={{ opacity: [0, 1, 0], y: -20, x: 20 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-6 right-0 z-50"
          >
            <p className="text-sm font-bold text-blue-400">Zzz...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Direction Flipper */}
      <div className={`relative w-full h-full transition-transform duration-300 ${direction === -1 ? "scale-x-[-1]" : ""}`}>

        {/* Cat Body */}
        <motion.div
          variants={bounceVariant}
          animate={catState}
          className="w-full h-full"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
            {/* Tail */}
            <motion.path
              d="M 80 50 Q 95 30 90 10"
              stroke="#d97706"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              animate={{ rotate: catState === "idle" ? [-5, 5, -5] : (catState === "happiness" ? [-10, 10, -10] : 0) }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ originX: "85px", originY: "50px" }}
            />

            {/* Body */}
            <ellipse cx="50" cy="44" rx="35" ry="25" fill="#f97316" stroke="#ea580c" strokeWidth="2" />

            {/* Head Group - Rotates to look at mouse */}
            <motion.g
              transform="translate(22, 38)"
              animate={{ rotate: direction === 1 ? lookAngle : -lookAngle }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {/* Ears */}
              <path d="M 0 0 L 5 -15 L 15 -5 Z" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
              <path d="M 25 -5 L 35 -15 L 40 0 Z" fill="#f97316" stroke="#ea580c" strokeWidth="2" />

              {/* Face */}
              <circle cx="20" cy="5" r="18" fill="#f97316" stroke="#ea580c" strokeWidth="2" />

              {/* Eyes */}
              {catState === "sleeping" || isBlinking ? (
                <>
                  <path d="M 12 5 Q 15 8 18 5" stroke="#7c2d12" strokeWidth="2" fill="none" />
                  <path d="M 22 5 Q 25 8 28 5" stroke="#7c2d12" strokeWidth="2" fill="none" />
                </>
              ) : (
                <>
                  <circle cx="14" cy="4" r="2.5" fill="black" />
                  <circle cx="26" cy="4" r="2.5" fill="black" />
                  <circle cx="15" cy="3" r="1" fill="white" />
                  <circle cx="27" cy="3" r="1" fill="white" />
                </>
              )}

              {/* Nose */}
              <path d="M 18 10 L 22 10 L 20 13 Z" fill="#pink-400" />

              {/* Whiskers */}
              <path d="M 5 10 L -5 8" stroke="#ea580c" strokeWidth="1" />
              <path d="M 5 12 L -5 14" stroke="#ea580c" strokeWidth="1" />
              <path d="M 35 10 L 45 8" stroke="#ea580c" strokeWidth="1" />
              <path d="M 35 12 L 45 14" stroke="#ea580c" strokeWidth="1" />
            </motion.g>

            {/* Legs */}
            <path d="M 30 70 L 30 78" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            <path d="M 70 70 L 70 78" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            <path d="M 40 72 L 40 78" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
            <path d="M 60 72 L 60 78" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />

          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}
