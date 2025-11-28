"use client"

import { motion } from "framer-motion"
import { Fish, Droplets } from "lucide-react"

interface PetBowlsProps {
    foodLevel: number
    waterLevel: number
    onRefillFood: () => void
    onRefillWater: () => void
}

export function PetBowls({ foodLevel, waterLevel, onRefillFood, onRefillWater }: PetBowlsProps) {
    return (
        <div className="fixed bottom-4 right-4 z-30 flex gap-8 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
            {/* Food Bowl */}
            <div className="relative group cursor-pointer" onClick={onRefillFood}>
                {/* Label */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded-full shadow-sm text-xs font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Refill Food
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-white drop-shadow-md">
                    FOOD
                </div>

                {/* Bowl Structure */}
                <div className="w-20 h-10 relative">
                    {/* Back/Inside Shadow */}
                    <div className="absolute inset-0 bg-gray-800 rounded-[50%] transform scale-x-100 scale-y-75 translate-y-1 shadow-inner border-2 border-gray-600" />

                    {/* Food Content */}
                    <div className="absolute inset-0 rounded-[50%] transform scale-x-[0.9] scale-y-[0.65] translate-y-1.5 overflow-hidden z-10">
                        <motion.div
                            className="w-full bg-orange-800 absolute bottom-0 left-0"
                            initial={{ height: 0 }}
                            animate={{ height: `${foodLevel}%` }}
                            transition={{ type: "spring", bounce: 0.2 }}
                        >
                            {/* Kibble Texture */}
                            <div className="w-full h-full opacity-50 bg-[radial-gradient(circle,_#3f1d0b_2px,_transparent_2.5px)] bg-[length:6px_6px]" />
                        </motion.div>
                    </div>

                    {/* Front Lip (to hide bottom of content) */}
                    <div className="absolute inset-0 rounded-[50%] border-2 border-gray-500 pointer-events-none z-20 transform scale-x-100 scale-y-75 translate-y-1" />

                    {/* Bowl Exterior/Side */}
                    <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-[50%] -z-10 transform scale-x-100 scale-y-100" />
                </div>
            </div>

            {/* Water Bowl */}
            <div className="relative group cursor-pointer" onClick={onRefillWater}>
                {/* Label */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded-full shadow-sm text-xs font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Refill Water
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-white drop-shadow-md">
                    WATER
                </div>

                {/* Bowl Structure */}
                <div className="w-20 h-10 relative">
                    {/* Back/Inside Shadow */}
                    <div className="absolute inset-0 bg-gray-800 rounded-[50%] transform scale-x-100 scale-y-75 translate-y-1 shadow-inner border-2 border-blue-900" />

                    {/* Water Content */}
                    <div className="absolute inset-0 rounded-[50%] transform scale-x-[0.9] scale-y-[0.65] translate-y-1.5 overflow-hidden z-10">
                        <motion.div
                            className="w-full bg-blue-500/80 absolute bottom-0 left-0 backdrop-blur-sm"
                            initial={{ height: 0 }}
                            animate={{ height: `${waterLevel}%` }}
                            transition={{ type: "spring", bounce: 0.2 }}
                        >
                            {/* Water Reflection */}
                            <div className="absolute top-1 left-2 w-full h-full bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-50" />
                        </motion.div>
                    </div>

                    {/* Front Lip */}
                    <div className="absolute inset-0 rounded-[50%] border-2 border-blue-800 pointer-events-none z-20 transform scale-x-100 scale-y-75 translate-y-1" />

                    {/* Bowl Exterior/Side */}
                    <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-b from-blue-800 to-blue-950 rounded-b-[50%] -z-10 transform scale-x-100 scale-y-100" />
                </div>
            </div>
        </div>
    )
}
