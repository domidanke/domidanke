import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { useWindowSize } from '../hooks/useWindowSize'

// Pick a random Domi reaction photo
const reactionPhotos = ['/images/domi1.jpg', '/images/domi2.jpg', '/images/domi3.jpg']
const randomPhoto = () => reactionPhotos[Math.floor(Math.random() * reactionPhotos.length)]

export default function SuccessModal({ visible, successText, onClose }) {
  const { width, height } = useWindowSize()
  const photo = visible ? randomPhoto() : reactionPhotos[0]

  return (
    <AnimatePresence>
      {visible && (
        <>
          <Confetti
            width={width}
            height={height}
            numberOfPieces={280}
            recycle={false}
            colors={['#FFD700', '#FF6B9D', '#8B5CF6', '#00D4FF', '#FF4444', '#44FF44', '#FFF8DC']}
            gravity={0.22}
          />

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(15,10,26,0.92)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: 24,
              textAlign: 'center',
            }}
          >
            {/* Modal box — stop click from closing when clicking inside */}
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.5, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, maxWidth: 420 }}
            >
              {/* Photo */}
              <motion.div
                initial={{ rotate: -15, scale: 0.6 }}
                animate={{ rotate: [0, 3, -3, 1, 0], scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  width: 200, height: 250,
                  borderRadius: 24,
                  border: '4px solid var(--gold)',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #2D1B4E, #1A1128)',
                  boxShadow: '0 0 60px rgba(255,215,0,0.35)',
                }}
              >
                <img
                  src={photo}
                  alt="Domi feiert"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
                <div style={{
                  display: 'none', width: '100%', height: '100%',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '5rem',
                  background: 'linear-gradient(135deg, #2D1B4E, #4A2D7A)',
                }}>
                  🥳
                </div>
              </motion.div>

              {/* DANKE title */}
              <motion.h2
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                style={{
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: '3rem',
                  color: 'var(--gold)',
                  filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))',
                }}
              >
                DANKE! 🎉
              </motion.h2>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontSize: '1rem',
                  color: 'var(--purple-dim)',
                  lineHeight: 1.65,
                }}
                dangerouslySetInnerHTML={{ __html: successText }}
              />

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.06, background: 'var(--gold)', color: '#0F0A1A' }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                style={{
                  padding: '13px 40px',
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  color: 'var(--gold)',
                  background: 'transparent',
                  border: '2px solid var(--gold)',
                  borderRadius: 50,
                  transition: 'background 0.25s, color 0.25s',
                }}
              >
                Noch ein Geschenk senden!
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
