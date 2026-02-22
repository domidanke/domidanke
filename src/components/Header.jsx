import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header style={{ textAlign: 'center', padding: '50px 0 24px' }}>
      <motion.h1
        initial={{ opacity: 0, y: -60, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
        style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: 'clamp(3rem, 12vw, 6rem)',
          letterSpacing: '6px',
          background: 'linear-gradient(135deg, #FFD700, #FFF8DC, #FFD700, #B8860B)',
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.35))',
          animation: 'goldShimmer 4s ease infinite',
        }}
      >
        DOMIDANKE
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        style={{
          fontWeight: 700,
          fontSize: '1.15rem',
          color: 'var(--purple-dim)',
          marginTop: '10px',
        }}
      >
        Schenke Domi etwas Lustiges &amp; Kreatives! 🎁
      </motion.p>

      <style>{`
        @keyframes goldShimmer {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
      `}</style>
    </header>
  )
}
