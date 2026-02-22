import { motion } from 'framer-motion'

const photos = [
  { src: '/images/domi1.jpg', label: 'Der Boss',   fallback: '😎' },
  { src: '/images/domi2.jpg', label: 'Überrascht', fallback: '😱' },
  { src: '/images/domi3.jpg', label: 'Partymodus', fallback: '🥳' },
]

function PhotoCard({ photo, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: index === 1 ? 0 : (index === 0 ? -6 : 6) }}
      animate={{ opacity: 1, y: 0, rotate: index === 1 ? 0 : (index === 0 ? -3 : 3) }}
      transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.2 + index * 0.12 }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex: 10,
        boxShadow: '0 0 40px rgba(255,215,0,0.5)',
        transition: { type: 'spring', stiffness: 300, damping: 16 },
      }}
      whileTap={{ scale: 0.96 }}
      style={{
        width: 140,
        height: 185,
        borderRadius: 20,
        border: '3px solid var(--gold)',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #2D1B4E, #1A1128)',
        flexShrink: 0,
      }}
    >
      <img
        src={photo.src}
        alt={photo.label}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={e => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextSibling.style.display = 'flex'
        }}
      />
      {/* Fallback emoji */}
      <div style={{
        display: 'none',
        position: 'absolute', inset: 0,
        flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontSize: '3.5rem',
        background: 'linear-gradient(135deg, #2D1B4E, #4A2D7A)',
      }}>
        {photo.fallback}
      </div>

      {/* Label overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
        padding: '20px 8px 8px',
        textAlign: 'center',
        fontWeight: 900,
        fontSize: '0.75rem',
        color: 'var(--gold)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
      }}>
        {photo.label}
      </div>
    </motion.div>
  )
}

export default function DomiPhotos() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: 20,
      flexWrap: 'wrap',
      margin: '28px 0',
    }}>
      {photos.map((photo, i) => (
        <PhotoCard key={photo.src} photo={photo} index={i} />
      ))}
    </div>
  )
}
