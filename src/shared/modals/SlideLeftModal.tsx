"use client"

import React from 'react'
import { motion, AnimatePresence, cubicBezier } from 'framer-motion'

interface SlidingModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
}

export default function SlidingModal({ isOpen, setIsOpen, children }: SlidingModalProps) {
  const customEasing = cubicBezier(0.25, 1, 0.5, 1)

  return (
    <div className='bg-[white]'>
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: customEasing }}
            className="fixed inset-0 bg-black"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 20,
              mass: 1,
              ease: customEasing,
              duration: 0.5
            }}
            className="absolute top-0 right-0 !w-full md:!w-[500px] h-screen  z-50 shadow-sm overflow-auto"
          >
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 hover:text-deepPink bg-[#f8f8f8] p-3 rounded-full text-white hover:text-gray-200 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            <motion.div 
              className="p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3, ease: customEasing }}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    </div>
  )
}