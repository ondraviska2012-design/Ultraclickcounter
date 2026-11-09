let audioCtx: AudioContext | null = null
let lastSpeech = 0

function getCtx() {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    audioCtx = new Ctor()
  }
  if (audioCtx.state === "suspended") void audioCtx.resume()
  return audioCtx
}

function playOuchSynth() {
  const ctx = getCtx()
  if (!ctx) return
  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  osc.type = "sawtooth"
  osc.frequency.setValueAtTime(320, now)
  osc.frequency.exponentialRampToValueAtTime(140, now + 0.28)
  filter.type = "lowpass"
  filter.frequency.setValueAtTime(1400, now)
  filter.frequency.exponentialRampToValueAtTime(500, now + 0.3)
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.25, now + 0.03)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32)
  osc.connect(filter).connect(gain).connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.34)
}

function speakOuch() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false
  const now = Date.now()
  if (now - lastSpeech < 350) return true
  lastSpeech = now
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance("Jau!")
  utter.lang = "cs-CZ"
  utter.pitch = 0.2
  utter.rate = 1.3
  utter.volume = 1
  window.speechSynthesis.speak(utter)
  return true
}

export function playOuch() {
  playOuchSynth()
  speakOuch()
}

export function playFanfare() {
  const ctx = getCtx()
  if (!ctx) return
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((freq, i) => {
    const t = ctx.currentTime + i * 0.12
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "square"
    osc.frequency.setValueAtTime(freq, t)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.27)
  })
}
