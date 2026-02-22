import { useEffect, useRef } from 'react'

export default function SparkleBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const sparkles = []

    for (let i = 0; i < 50; i++) {
      const el = document.createElement('div')
      const size = 2 + Math.random() * 5
      const hue = Math.random() > 0.5 ? 'rgba(255,215,0,' : 'rgba(167,139,250,'
      const duration = 5 + Math.random() * 8
      const delay = Math.random() * 6

      Object.assign(el.style, {
        position: 'absolute',
        left: Math.random() * 100 + '%',
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        background: hue + '0.8)',
        animation: `sparkleFloat ${duration}s ${delay}s linear infinite`,
        opacity: 0,
        pointerEvents: 'none',
      })
      container.appendChild(el)
      sparkles.push(el)
    }

    return () => sparkles.forEach(s => s.remove())
  }, [])

  return (
    <>
      <style>{`
        @keyframes sparkleFloat {
          0%   { opacity: 0; transform: translateY(100vh) scale(0); }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(-8vh) scale(1); }
        }
      `}</style>
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      />
    </>
  )
}
