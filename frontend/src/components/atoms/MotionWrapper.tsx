"use client"

import { motion, HTMLMotionProps } from "framer-motion"

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
    delay?: number
}

export function MotionWrapper({ children, delay = 0, className, ...props }: MotionWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function MotionScale({ children, delay = 0, className, ...props }: MotionWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}
