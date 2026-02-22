import { motion } from 'framer-motion'

export default function GiftCard({ gift, selected, onSelect }) {
  return (
    <motion.div
      onClick={() => onSelect(gift)}
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{
        scale: 1.08,
        y: -6,
        boxShadow: '0 12px 30px rgba(255,215,0,0.2)',
        transition: { type: 'spring', stiffness: 350, damping: 18 },
      }}
      whileTap={{ scale: 0.93 }}
      style={{
        background: selected ? '#2D1B4E' : 'var(--card-bg)',
        border: `2px solid ${selected ? 'var(--gold)' : 'transparent'}`,
        borderRadius: 16,
        padding: '20px 12px',
        textAlign: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: selected ? '0 0 24px rgba(255,215,0,0.18)' : 'none',
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Gold highlight overlay when selected */}
      {selected && (
        <motion.div
          layoutId="selected-glow"
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(255,215,0,0.08), transparent)',
            borderRadius: 14,
            pointerEvents: 'none',
          }}
        />
      )}

      <motion.span
        style={{ fontSize: '2.6rem', display: 'block', marginBottom: 8, lineHeight: 1 }}
        whileHover={{ scale: 1.25, rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
      >
        {gift.emoji}
      </motion.span>

      <div style={{ fontWeight: 900, fontSize: '0.85rem', color: 'var(--text)' }}>
        {gift.name}
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--purple-light)', marginTop: 4 }}>
        {gift.desc}
      </div>
    </motion.div>
  )
}
