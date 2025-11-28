"use client"

import { motion, useAnimation, Variants } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export function FooterCats() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    return (
        <div className="absolute top-0 left-0 w-full h-32 -translate-y-full overflow-hidden pointer-events-none">
            {/* Cat 1 - Walking Right */}
            <SmartCat
                direction="right"
                speed={20}
                delay={0}
                color="text-primary"
                size="w-8 h-8"
            />

            {/* Cat 2 - Walking Right (Slower) */}
            <SmartCat
                direction="right"
                speed={35}
                delay={10}
                color="text-muted-foreground opacity-50"
                size="w-6 h-6"
            />

            {/* Cat 3 - Walking Left */}
            <SmartCat
                direction="left"
                speed={25}
                delay={5}
                color="text-primary/80"
                size="w-7 h-7"
            />
        </div>
    )
}

interface SmartCatProps {
    direction: "left" | "right"
    speed: number
    delay: number
    color: string
    size: string
}

function SmartCat({ direction, speed, delay, color, size }: SmartCatProps) {
    const controls = useAnimation()
    const [isGrooming, setIsGrooming] = useState(false)
    const [isJumping, setIsJumping] = useState(false)

    // Start walking loop
    useEffect(() => {
        const startWalking = async () => {
            await controls.start({
                x: direction === "right" ? ["-10vw", "110vw"] : ["110vw", "-10vw"],
                transition: {
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                    delay: delay,
                    repeatDelay: 0
                }
            })
        }
        startWalking()
    }, [controls, direction, speed, delay])

    // Random Grooming Logic
    useEffect(() => {
        const checkGrooming = async () => {
            // 10% chance to stop and groom every 5 seconds
            if (Math.random() < 0.3) {
                setIsGrooming(true)
                setTimeout(() => setIsGrooming(false), 4000) // Groom for 4s
            }
        }

        const interval = setInterval(checkGrooming, 10000 + Math.random() * 10000) // Check every 10-20s
        return () => clearInterval(interval)
    }, [])

    const handleClick = async () => {
        if (isJumping) return
        setIsJumping(true)
        // Jump animation handled by variants
        setTimeout(() => setIsJumping(false), 500)
    }

    return (
        <motion.div
            className={`absolute bottom-0 left-0 ${size} ${color} pointer-events-auto cursor-pointer`}
            animate={controls}
            onClick={handleClick}
        >
            <CatSVG
                flip={direction === "right"}
                isGrooming={isGrooming}
                isJumping={isJumping}
            />
        </motion.div>
    )
}

function CatSVG({ flip, isGrooming, isJumping }: { flip: boolean, isGrooming: boolean, isJumping: boolean }) {
    return (
        <svg viewBox="0 0 100 80" className="w-full h-full overflow-visible" style={{ transform: flip ? "scaleX(-1)" : undefined }}>
            <motion.g
                animate={
                    isJumping ? { y: [0, -40, 0] } :
                        isGrooming ? { y: 5 } :
                            { y: [0, -2, 0] }
                }
                transition={
                    isJumping ? { duration: 0.5, ease: "easeOut" } :
                        isGrooming ? { duration: 0.5 } :
                            { repeat: Infinity, duration: 0.4, ease: "easeInOut" }
                }
            >
                {/* Tail */}
                <motion.path
                    d="M 85 50 Q 95 20 85 5"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    animate={isGrooming ? { rotate: [0, 10, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                />

                {/* Body */}
                <ellipse cx="50" cy="50" rx="30" ry="20" fill="currentColor" />

                {/* Head */}
                <motion.g
                    animate={isGrooming ? { rotate: [0, 20, 0], y: [0, 5, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    <circle cx="25" cy="35" r="15" fill="currentColor" />
                    <path d="M 15 25 L 10 10 L 25 20 Z" fill="currentColor" />
                    <path d="M 35 25 L 40 10 L 25 20 Z" fill="currentColor" />
                </motion.g>

                {/* Legs */}
                {!isGrooming && (
                    <>
                        <motion.path
                            d="M 35 65 L 35 75"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            animate={{ rotate: [10, -10, 10] }}
                            transition={{ repeat: Infinity, duration: 0.4 }}
                            style={{ originY: "65px" }}
                        />
                        <motion.path
                            d="M 65 65 L 65 75"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            animate={{ rotate: [-10, 10, -10] }}
                            transition={{ repeat: Infinity, duration: 0.4 }}
                            style={{ originY: "65px" }}
                        />
                    </>
                )}

                {/* Grooming Paw */}
                {isGrooming && (
                    <motion.path
                        d="M 30 50 Q 20 40 25 35"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                        animate={{ d: ["M 30 50 Q 20 40 25 35", "M 30 50 Q 15 35 25 30", "M 30 50 Q 20 40 25 35"] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                    />
                )}
            </motion.g>
        </svg>
    )
}
