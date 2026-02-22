import { motion } from 'framer-motion'

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '2px solid var(--border-dim)',
  borderRadius: 12,
  padding: '13px 16px',
  color: 'var(--text)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.25s, box-shadow 0.25s',
}

const focusStyle = {
  borderColor: 'var(--gold)',
  boxShadow: '0 0 16px rgba(255,215,0,0.12)',
}

function FancyInput({ as: Tag = 'input', label, ...props }) {
  return (
    <div style={{ marginTop: 14 }}>
      <label style={{
        display: 'block',
        fontWeight: 900,
        marginBottom: 8,
        color: 'var(--gold)',
      }}>
        {label}
      </label>
      <Tag
        {...props}
        style={inputStyle}
        onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
        onBlur={e => Object.assign(e.currentTarget.style, { borderColor: 'var(--border-dim)', boxShadow: 'none' })}
      />
    </div>
  )
}

export default function MessageForm({ message, sender, onMessageChange, onSenderChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, type: 'spring', stiffness: 160, damping: 14 }}
      style={{
        background: 'var(--card-bg)',
        borderRadius: 20,
        padding: 24,
        marginBottom: 28,
        border: '2px solid var(--card-bg2)',
      }}
    >
      <FancyInput
        as="textarea"
        label="📝 Deine Nachricht an Domi:"
        rows={4}
        value={message}
        onChange={e => onMessageChange(e.target.value)}
        placeholder="Schreib was Lustiges, Nettes oder total Verrücktes..."
        style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
        onFocus={e => Object.assign(e.currentTarget.style, { ...inputStyle, resize: 'vertical', minHeight: 100, ...focusStyle })}
        onBlur={e => Object.assign(e.currentTarget.style, { ...inputStyle, resize: 'vertical', minHeight: 100, borderColor: 'var(--border-dim)', boxShadow: 'none' })}
      />

      <FancyInput
        label="✍️ Dein Name:"
        type="text"
        value={sender}
        onChange={e => onSenderChange(e.target.value)}
        placeholder="Wer bist du? (oder bleib anonym, du Geheimnis)"
      />
    </motion.div>
  )
}
