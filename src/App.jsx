import { useState, useCallback, useEffect } from 'react'
import SparkleBackground from './components/SparkleBackground'
import Header from './components/Header'
import DomiPhotos from './components/DomiPhotos'
import GiftCounter from './components/GiftCounter'
import GiftGrid from './components/GiftGrid'
import MessageForm from './components/MessageForm'
import SendButton from './components/SendButton'
import SuccessModal from './components/SuccessModal'
import { SUCCESS_MESSAGES } from './data/gifts'
import { sendGift, fetchGiftCount } from './lib/supabase'

export default function App() {
  const [selectedGift, setSelectedGift] = useState(null)
  const [message, setMessage]           = useState('')
  const [sender, setSender]             = useState('')
  const [shaking, setShaking]           = useState(false)
  const [giftCount, setGiftCount]       = useState(0)
  const [showSuccess, setShowSuccess]   = useState(false)
  const [successText, setSuccessText]   = useState('')
  const [sending, setSending]           = useState(false)

  useEffect(() => {
    fetchGiftCount().then(c => setGiftCount(c))
  }, [])

  const handleSend = useCallback(async () => {
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

    setSending(true)
    await sendGift(selectedGift, message.trim(), displaySender)
    const newCount = await fetchGiftCount()
    setSending(false)

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
        <SendButton onClick={handleSend} disabled={sending} />

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
