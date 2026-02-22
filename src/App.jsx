import { useState, useCallback } from 'react'
import SparkleBackground from './components/SparkleBackground'
import Header from './components/Header'
import DomiPhotos from './components/DomiPhotos'
import GiftCounter from './components/GiftCounter'
import GiftGrid from './components/GiftGrid'
import MessageForm from './components/MessageForm'
import SendButton from './components/SendButton'
import SuccessModal from './components/SuccessModal'
import { GIFTS, SUCCESS_MESSAGES } from './data/gifts'

function getCount() {
  return parseInt(localStorage.getItem('domidanke-count') || '0')
}

function saveGift(gift, message, sender) {
  const count = getCount() + 1
  localStorage.setItem('domidanke-count', String(count))

  const gifts = JSON.parse(localStorage.getItem('domidanke-gifts') || '[]')
  gifts.push({ gift: gift.id, message, sender, timestamp: new Date().toISOString() })
  localStorage.setItem('domidanke-gifts', JSON.stringify(gifts))

  return count
}

export default function App() {
  const [selectedGift, setSelectedGift] = useState(null)
  const [message, setMessage]           = useState('')
  const [sender, setSender]             = useState('')
  const [shaking, setShaking]           = useState(false)
  const [giftCount, setGiftCount]       = useState(getCount)
  const [showSuccess, setShowSuccess]   = useState(false)
  const [successText, setSuccessText]   = useState('')

  const handleSend = useCallback(() => {
    if (!selectedGift) {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      return
    }

    const displaySender = sender.trim() || 'Anonymer Held'
    const randomMsg = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)]
    const giftDisplay = `${selectedGift.emoji} ${selectedGift.name}`
    let text = randomMsg(displaySender, giftDisplay)
    if (message.trim()) {
      text += `<br><br><em>"${message.trim()}"</em>`
    }

    const newCount = saveGift(selectedGift, message.trim(), displaySender)
    setGiftCount(newCount)
    setSuccessText(text)
    setShowSuccess(true)
  }, [selectedGift, message, sender])

  const handleClose = useCallback(() => {
    setShowSuccess(false)
    setSelectedGift(null)
    setMessage('')
    setSender('')
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <SparkleBackground />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 820,
        margin: '0 auto',
        padding: '0 20px 40px',
      }}>
        <Header />
        <DomiPhotos />
        <GiftCounter count={giftCount} />
        <GiftGrid selected={selectedGift} onSelect={setSelectedGift} shaking={shaking} />
        <MessageForm
          message={message}
          sender={sender}
          onMessageChange={setMessage}
          onSenderChange={setSender}
        />
        <SendButton onClick={handleSend} />

        <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.78rem', paddingBottom: 8 }}>
          Made with ❤️ für Domi &nbsp;|&nbsp; DOMIDANKE 2026
        </p>
      </div>

      <SuccessModal
        visible={showSuccess}
        successText={successText}
        onClose={handleClose}
      />
    </div>
  )
}
