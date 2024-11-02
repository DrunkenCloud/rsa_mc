"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Monitor } from "lucide-react"

export default function Component() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [randomChars, setRandomChars] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleGenerate = () => {
    setIsGenerating(true)
    setRandomChars("")
    generateRandomChars()
    setTimeout(() => setIsGenerating(false), 5000) // Reset after 5 seconds
  }

  const generateRandomChars = () => {
    let chars = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"
    const iterations = 50 // Number of characters to generate

    for (let i = 0; i < iterations; i++) {
      setTimeout(() => {
        chars += possible.charAt(Math.floor(Math.random() * possible.length))
        setRandomChars(chars)
      }, i * 100) // 100ms delay between each character
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const drawPulse = (time: number) => {
      const offset = 50; // Number of pixels to shift the wave to the right
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      if (isGenerating) {
        ctx.beginPath();
        ctx.moveTo(offset, canvas.height / 2); // Start the wave at the offset position
    
        for (let i = 0; i < canvas.width - offset; i++) { // Ensure wave fits in the canvas
          const isHigh = Math.floor((i + time) * 0.1) % 2 === 0; // Alternate between high and low
          const y = isHigh ? canvas.height / 4 : (canvas.height * 3) / 4; // Top or bottom of wave
          ctx.lineTo(i + offset, y); // Apply offset to the horizontal position
        }
    
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    
      animationFrameId = requestAnimationFrame(() => drawPulse(time + 1));
    };
        

    drawPulse(0)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isGenerating])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8">
        <div className="w-full md:w-[60%] h-80 relative">
          <Monitor className="w-full h-full text-gray-700" />
        </div>
        <div className="relative w-full md:w-[50%] h-1">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-green-500" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-red-500" />
          <div className="absolute top-0 left-1/2 w-2 h-full bg-green-500 transform -translate-x-1/2" />
          <div className="absolute top-0 left-1/2 w-1 h-16 bg-green-500 transform -translate-x-1/2 -translate-y-full" />
        </div>
        <div className="w-full md:w-[60%] h-80 relative flex items-center justify-between">
          <Monitor className="w-full h-full text-gray-700" />
          <div className="w-[40px] h-[240px] relative">
            <canvas ref={canvasRef} width="105" height="240" className="absolute right-0 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      </div>
      <div
        onClick={handleGenerate}
        className={`mt-8 px-6 py-3 text-lg text-white bg-blue-500 rounded cursor-pointer ${isGenerating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
        style={{ pointerEvents: isGenerating ? 'none' : 'auto' }}
      >
        Generate RSA Key
      </div>
      <div className="flex w-full max-w-6xl mt-8 gap-8">
        <div className="w-full md:w-[40%] h-32 bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
          {isGenerating && (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center font-bold text-gray-900"
              >
                Generating RSA Key...
              </motion.p>
              <p className="text-center font-bold text-gray-900 mt-2 z-10 font-mono">
                {randomChars}
              </p>
            </>
          )}
        </div>
        <div className="w-[20%] hidden md:block" />
        <div className="w-full md:w-[40%] h-32 bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center relative overflow-hidden">
          {isGenerating && (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center font-bold text-gray-900"
              >
                Getting RSA key via electrical pulses
              </motion.p>
              <p className="text-center font-bold text-gray-900 mt-2 z-10 font-mono">
                {randomChars}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}