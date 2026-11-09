import { ACHIEVEMENTS } from "@/lib/game-data"
import { StarIcon } from "./star-icon"

export function AchievementsPanel({ clicks }: { clicks: number }) {
  const unlockedCount = ACHIEVEMENTS.filter((a) => clicks >= a.clicks).length
  return (
    <section aria-labelledby="ach-heading" className="comic-box rounded-3xl bg-paper p-4 lg:w-72">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 id="ach-heading" className="comic-text text-3xl text-yellow">
          Achievementy
        </h2>
        <span className="font-bold">
          {unlockedCount}/{ACHIEVEMENTS.length}
        </span>
      </div>
      <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1">
        {ACHIEVEMENTS.map((a) => {
          const unlocked = clicks >= a.clicks
          return (
            <li
              key={a.id}
              className={`flex items-center gap-2 rounded-2xl border-[3px] border-ink p-2 ${
                unlocked ? "bg-yellow" : "bg-paper opacity-60"
              }`}
            >
              <span
                aria-hidden="true"
                className={`comic-text flex size-8 shrink-0 items-center justify-center rounded-full border-[3px] border-ink text-lg ${
                  unlocked ? "bg-donut text-yellow" : "bg-ink/20 text-paper"
                }`}
              >
                {unlocked ? <StarIcon className="size-5 text-yellow" /> : "?"}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold leading-tight">{a.title}</p>
                <p className="text-xs">{a.description}</p>
              </div>
              <span className="sr-only">{unlocked ? "Získáno" : "Zatím nezískáno"}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
