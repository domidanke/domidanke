import { motion, AnimatePresence } from 'framer-motion'
import { GIFTS } from '../data/gifts'
import GiftCard from './GiftCard'

export default function GiftGrid({ selected, onSelect, shaking }) {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: '1.6rem',
          textAlign: 'center',
          color: 'var(--gold)',
          margin: '32px 0 6px',
        }}
      >
        Wähle ein Geschenk aus
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          textAlign: 'center',
          color: 'var(--purple-light)',
          marginBottom: 20,
          fontSize: '0.95rem',
        }}
      >
        Klicke auf das perfekte Geschenk für Domi
      </motion.p>

      <motion.div
        animate={shaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.45 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
          gap: 16,
          marginBottom: 30,
        }}
      >
        {GIFTS.map((gift, i) => (
          <motion.div
            key={gift.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i + 0.3, type: 'spring', stiffness: 180, damping: 14 }}
          >
            <GiftCard
              gift={gift}
              selected={selected?.id === gift.id}
              onSelect={onSelect}
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}
