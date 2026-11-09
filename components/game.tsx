"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ACHIEVEMENTS, SKILLS, getPerClick, type Achievement, type Skill } from "@/lib/game-data"
import { playFanfare, playOuch } from "@/lib/sound"
import { GameTitle } from "./game-title"
import { ScoreDisplay } from "./score-display"
import { CouchButton } from "./couch-button"
import { SkillsPanel } from "./skills-panel"
import { AchievementsPanel } from "./achievements-panel"
import { SpecialEvent } from "./special-event"
import { AchievementToast } from "./achievement-toast"

const STORAGE_KEY = "ultraclickcounter-save"

export function Game() {
  const [score, setScore] = useState(0)
  const [clicks, setClicks] = useState(0)
  const [soundOn, setSoundOn] = useState(true)
  const [specialSkill, setSpecialSkill] = useState<Skill | null>(null)
  const [toast, setToast] = useState<Achievement | null>(null)
  const [loaded, setLoaded] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw) as { score?: number; clicks?: number; soundOn?: boolean }
        setScore(Number(data.score) || 0)
        setClicks(Number(data.clicks) || 0)
        if (typeof data.soundOn === "boolean") setSoundOn(data.soundOn)
      }
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ score, clicks, soundOn }))
  }, [score, clicks, soundOn, loaded])

  const perClick = getPerClick(score)

  const handleClick = useCallback(() => {
    const gain = getPerClick(score)
    const nextScore = score + gain
    const nextClicks = clicks + 1

    if (soundOn) playOuch()

    const newSkill = SKILLS.find((s) => score < s.unlockAt && nextScore >= s.unlockAt)
    if (newSkill) {
      setSpecialSkill(newSkill)
      if (soundOn) playFanfare()
    }

    const newAchievement = ACHIEVEMENTS.find((a) => clicks < a.clicks && nextClicks >= a.clicks)
    if (newAchievement) {
      setToast(newAchievement)
      if (toastTimer.current) clearTimeout(toastTimer.current)
      toastTimer.current = setTimeout(() => setToast(null), 3000)
    }

    setScore(nextScore)
    setClicks(nextClicks)
    return gain
  }, [score, clicks, soundOn])

  const handleReset = () => {
    if (!window.confirm("Opravdu chceš začít znovu? Přijdeš o všechny body.")) return
    setScore(0)
    setClicks(0)
  }

  return (
    <div
      className="min-h-dvh bg-sky bg-cover bg-center"
      style={{ backgroundImage: "url(/images/sky.png)" }}
    >
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:py-10">
        <header className="flex flex-col items-center gap-3">
          <GameTitle />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSoundOn((v) => !v)}
              aria-pressed={soundOn}
              className="comic-box rounded-full bg-paper px-4 py-1 text-sm font-bold transition-transform active:translate-x-1 active:translate-y-1"
            >
              {soundOn ? "Zvuk: zapnutý" : "Zvuk: vypnutý"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="comic-box rounded-full bg-donut px-4 py-1 text-sm font-bold text-paper transition-transform active:translate-x-1 active:translate-y-1"
            >
              Začít znovu
            </button>
          </div>
        </header>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <SkillsPanel score={score} />

          <section className="flex flex-1 flex-col items-center gap-4" aria-label="Herní plocha">
            <ScoreDisplay score={score} perClick={perClick} />
            <CouchButton onPress={handleClick} />
          </section>

          <AchievementsPanel clicks={clicks} />
        </div>
      </main>

      {specialSkill && <SpecialEvent skill={specialSkill} onClose={() => setSpecialSkill(null)} />}
      {toast && <AchievementToast achievement={toast} />}
    </div>
  )
}
