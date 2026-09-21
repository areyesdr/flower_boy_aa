const STEP = 0.22
const PROGRESSION = [
  [60, 64, 67, 72, 67, 64, 72, 67],
  [55, 59, 62, 67, 62, 59, 67, 62],
  [57, 60, 64, 69, 64, 60, 69, 64],
  [53, 57, 60, 65, 60, 57, 65, 60],
]

interface MelodyPlayer {
  start: () => void
  stop: () => void
  toggle: () => void
  isPlaying: () => boolean
}

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

export function createMelodyPlayer(): MelodyPlayer {
  let ctx: AudioContext | null = null
  let master: GainNode | null = null
  let nextTime = 0
  let step = 0
  let timer: number | null = null
  let playing = false

  function playNote(midi: number, time: number): void {
    if (!ctx || !master) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = midiToFreq(midi)
    gain.gain.setValueAtTime(0, time)
    gain.gain.linearRampToValueAtTime(0.045, time + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + STEP * 0.95)
    osc.connect(gain)
    gain.connect(master)
    osc.start(time)
    osc.stop(time + STEP)
  }

  function schedule(): void {
    if (!ctx || !playing) return
    while (nextTime < ctx.currentTime + 0.6) {
      const chord = PROGRESSION[Math.floor(step / PROGRESSION[0].length) % PROGRESSION.length]
      const note = chord[step % chord.length]
      playNote(note, nextTime)
      if (step % 4 === 0) playNote(note + 12, nextTime)
      nextTime += STEP
      step += 1
    }
  }

  function start(): void {
    if (!ctx) {
      const AudioCtor =
        window.AudioContext ??
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioCtor) return
      ctx = new AudioCtor()
      master = ctx.createGain()
      master.gain.value = 0.9
      master.connect(ctx.destination)
    }
    void ctx.resume()
    playing = true
    nextTime = ctx.currentTime + 0.05
    step = 0
    schedule()
    timer = window.setInterval(schedule, 90)
  }

  function stop(): void {
    playing = false
    if (timer !== null) {
      window.clearInterval(timer)
      timer = null
    }
  }

  function toggle(): void {
    if (playing) stop()
    else start()
  }

  return {
    start,
    stop,
    toggle,
    isPlaying: () => playing,
  }
}