import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SparkleBackground from './components/SparkleBackground'
import { fetchGifts } from './lib/supabase'
import { GIFTS } from './data/gifts'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 1) return 'Gerade eben'
  if (mins < 60) return `vor ${mins} Min.`
  if (hours < 24) return `vor ${hours} Std.`
  return `vor ${days} Tag${days > 1 ? 'en' : ''}`
}

function giftEmoji(giftId) {
  const g = GIFTS.find(g => g.id === giftId)
  return g ? g.emoji : '🎁'
}

export default function DomiDashboard() {
  const [gifts, setGifts]     = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('all')

  useEffect(() => {
    fetchGifts().then(data => {
      setGifts(data)
      setLoading(false)
    })
  }, [])

  const uniqueSenders = [...new Set(gifts.map(g => g.sender))]
  const filtered = filter === 'all' ? gifts : gifts.filter(g => g.sender === filter)

  const giftTypeCounts = {}
  for (const g of gifts) {
    giftTypeCounts[g.gift_id] = (giftTypeCounts[g.gift_id] || 0) + 1
  }
  const topGifts = Object.entries(giftTypeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <SparkleBackground />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 900,
        margin: '0 auto',
        padding: '0 20px 40px',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          style={{ textAlign: 'center', paddingTop: 40, marginBottom: 30 }}
        >
          <h1 style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            background: 'linear-gradient(135deg, var(--gold), var(--pink), var(--purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 8,
          }}>
            DOMI'S GESCHENKE 🎁
          </h1>
          <p style={{ color: 'var(--purple-dim)', fontSize: '1.1rem' }}>
            Alle Geschenke, die dir geschickt wurden!
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 30,
          }}
        >
          <StatCard label="Total Geschenke" value={gifts.length} emoji="🎁" />
          <StatCard label="Absender" value={uniqueSenders.length} emoji="👥" />
          {topGifts[0] && (
            <StatCard
              label="Beliebtestes"
              value={giftEmoji(topGifts[0][0])}
              emoji={`×${topGifts[0][1]}`}
            />
          )}
        </motion.div>

        {/* Filter by sender */}
        {uniqueSenders.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: 28,
            }}
          >
            <FilterChip
              label="Alle"
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            />
            {uniqueSenders.map(s => (
              <FilterChip
                key={s}
                label={s}
                active={filter === s}
                onClick={() => setFilter(s)}
              />
            ))}
          </motion.div>
        )}

        {/* Gift list */}
        {loading ? (
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ textAlign: 'center', color: 'var(--purple-dim)', fontSize: '1.2rem', marginTop: 60 }}
          >
            Geschenke werden geladen...
          </motion.p>
        ) : gifts.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '1.1rem', marginTop: 60 }}>
            Noch keine Geschenke 😢 Teile den Link und warte!
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            <AnimatePresence>
              {filtered.map((gift, i) => (
                <GiftItem key={gift.id} gift={gift} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          color: 'var(--text-dim)',
          fontSize: '0.78rem',
          paddingTop: 40,
          paddingBottom: 8,
        }}>
          Made with ❤️ für Domi &nbsp;|&nbsp; DOMIDANKE 2026
        </p>
      </div>
    </div>
  )
}

/* ── Sub-components ── */

function StatCard({ label, value, emoji }) {
  return (
    <div style={{
      background: 'var(--card-bg)',
      border: '1px solid var(--border-dim)',
      borderRadius: 16,
      padding: '16px 24px',
      textAlign: 'center',
      minWidth: 130,
    }}>
      <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>{value} {emoji}</div>
      <div style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>{label}</div>
    </div>
  )
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 16px',
        borderRadius: 20,
        border: active ? '2px solid var(--gold)' : '1px solid var(--border-dim)',
        background: active ? 'rgba(255,215,0,0.15)' : 'var(--card-bg)',
        color: active ? 'var(--gold)' : 'var(--purple-dim)',
        fontSize: '0.85rem',
        fontWeight: active ? 700 : 400,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {label}
    </button>
  )
}

function GiftItem({ gift, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-dim)',
        borderRadius: 16,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '2rem' }}>{gift.gift_emoji}</span>
        <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
          {timeAgo(gift.created_at)}
        </span>
      </div>

      <div>
        <div style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: '1.05rem',
          color: 'var(--gold)',
        }}>
          {gift.gift_name}
        </div>
        <div style={{ color: 'var(--purple-dim)', fontSize: '0.88rem' }}>
          von <strong>{gift.sender}</strong>
        </div>
      </div>

      {gift.message && (
        <div style={{
          background: 'var(--card-bg2)',
          borderRadius: 10,
          padding: '10px 14px',
          color: 'var(--text)',
          fontSize: '0.9rem',
          fontStyle: 'italic',
          borderLeft: '3px solid var(--gold)',
        }}>
          "{gift.message}"
        </div>
      )}
    </motion.div>
  )
}
