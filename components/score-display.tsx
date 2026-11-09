import { formatNumber } from "@/lib/game-data"

export function ScoreDisplay({ score, perClick }: { score: number; perClick: number }) {
  return (
    <div className="comic-box flex -rotate-2 flex-col items-center rounded-3xl bg-paper px-8 py-3">
      <span className="comic-text text-7xl leading-none text-yellow tabular-nums md:text-8xl" aria-live="polite">
        {formatNumber(score)}
      </span>
      <span className="mt-1 text-base font-bold">
        {"+"}
        {formatNumber(perClick)} za klik
      </span>
    </div>
  )
}
