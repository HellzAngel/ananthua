import React, { useState, useEffect } from 'react'

const LoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsClosing(true)
            setTimeout(onFinished, 1000)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)
    return () => clearInterval(timer)
  }, [onFinished])

  return (
    <div className={`loading-screen ${isClosing ? 'fade-out' : ''}`}>
      <div className="sketchbook-animation">
        <div className="pencil-drawing">
          <svg viewBox="0 0 200 200" width="200" height="200">
            <path 
              d="M 50,150 Q 100,50 150,150" 
              fill="none" 
              stroke="#3d3d3d" 
              strokeWidth="2" 
              strokeDasharray="300"
              strokeDashoffset={300 - (300 * progress / 100)}
            />
            <circle 
              cx="100" cy="100" r="40" 
              fill="none" 
              stroke="#3d3d3d" 
              strokeWidth="1" 
              strokeDasharray="251"
              strokeDashoffset={251 - (251 * progress / 100)}
            />
          </svg>
        </div>
        <h2 className="loading-text">ananthu is sketching... {Math.round(progress)}%</h2>
      </div>
    </div>
  )
}

export default LoadingScreen
