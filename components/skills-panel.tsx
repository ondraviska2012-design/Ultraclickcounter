import { SKILLS, formatNumber } from "@/lib/game-data"

export function SkillsPanel({ score }: { score: number }) {
  return (
    <section aria-labelledby="skills-heading" className="comic-box rounded-3xl bg-yellow p-4 lg:w-72">
      <h2 id="skills-heading" className="comic-text mb-3 text-3xl text-paper">
        Dovednosti
      </h2>
      <ul className="flex flex-col gap-2">
        {SKILLS.map((skill) => {
          const unlocked = score >= skill.unlockAt
          const progress = Math.min(100, (score / skill.unlockAt) * 100)
          return (
            <li
              key={skill.id}
              className={`rounded-2xl border-[3px] border-ink p-2 ${unlocked ? "bg-paper" : "bg-paper/60"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold uppercase">{skill.character}</p>
                  <p className="font-bold leading-tight">{skill.title}</p>
                </div>
                <span
                  className={`comic-text shrink-0 rounded-full border-[3px] border-ink px-2 text-xl ${
                    unlocked ? "bg-donut text-yellow" : "bg-sky text-paper"
                  }`}
                >
                  {"+"}
                  {skill.perClick}
                </span>
              </div>
              {unlocked ? (
                <p className="mt-1 text-xs font-bold">Odemčeno!</p>
              ) : (
                <div className="mt-2">
                  <div
                    className="h-2 overflow-hidden rounded-full border-2 border-ink bg-paper"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress)}
                    aria-label={`Postup k dovednosti ${skill.title}`}
                  >
                    <div className="h-full bg-sky" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-1 text-xs">Odemkne se při {formatNumber(skill.unlockAt)} bodech</p>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
