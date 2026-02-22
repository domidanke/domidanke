import { motion } from 'framer-motion'

export default function SendButton({ onClick, disabled }) {
  return (
    <>
      <style>{`
        @keyframes btnShimmer {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes btnGlow {
          0%,100% { box-shadow: 0 0 20px rgba(255,215,0,0.3); }
          50%      { box-shadow: 0 0 50px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.2); }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, type: 'spring', stiffness: 180, damping: 14 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 50 }}
      >
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          style={{
            padding: '18px 56px',
            fontFamily: "'Fredoka One', cursive",
            fontSize: '1.4rem',
            letterSpacing: '2px',
            color: '#0F0A1A',
            background: 'linear-gradient(135deg, #FFD700, #FFF8DC, #FFD700, #B8860B)',
            backgroundSize: '300% 300%',
            border: 'none',
            borderRadius: 50,
            animation: 'btnShimmer 3s ease infinite, btnGlow 2.5s ease infinite',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {disabled ? 'WIRD GESENDET...' : 'GESCHENK SENDEN! 🎁'}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
              borderRadius: 50,
              pointerEvents: 'none',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
          />
        </motion.button>
      </motion.div>
    </>
  )
}
