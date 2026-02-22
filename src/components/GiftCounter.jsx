import { motion, AnimatePresence } from 'framer-motion'

export default function GiftCounter({ count }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      style={{
        textAlign: 'center',
        padding: '12px 20px',
        background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(139,92,246,0.08))',
        border: '1px solid rgba(255,215,0,0.15)',
        borderRadius: 14,
        marginBottom: 12,
        fontSize: '0.9rem',
        color: 'var(--purple-dim)',
      }}
    >
      Domi hat bereits{' '}
      <AnimatePresence mode="popLayout">
        <motion.strong
          key={count}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          style={{ color: 'var(--gold)', fontSize: '1.3rem', display: 'inline-block' }}
        >
          {count}
        </motion.strong>
      </AnimatePresence>
      {' '}Geschenke erhalten! Sei der/die Nächste!
    </motion.div>
  )
}
