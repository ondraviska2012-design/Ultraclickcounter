import type { Achievement } from "@/lib/game-data"
import { StarIcon } from "./star-icon"

export function AchievementToast({ achievement }: { achievement: Achievement }) {
  return (
    <div
      role="status"
      className="comic-box slide-in fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-2xl bg-paper p-3 pr-5"
    >
      <span
        aria-hidden="true"
        className="comic-text flex size-12 items-center justify-center rounded-full border-[3px] border-ink bg-yellow text-2xl text-donut"
      >
        <StarIcon className="size-8 text-donut" />
      </span>
      <div>
        <p className="text-xs font-bold uppercase">Nový achievement!</p>
        <p className="comic-text text-2xl leading-tight text-yellow">{achievement.title}</p>
      </div>
    </div>
  )
}
