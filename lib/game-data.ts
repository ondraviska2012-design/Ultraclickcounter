export type Achievement = {
  id: string
  title: string
  description: string
  clicks: number
}

export type Skill = {
  id: string
  character: string
  title: string
  perClick: number
  unlockAt: number
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", title: "První D'oh!", description: "Klikni poprvé", clicks: 1 },
  { id: "a2", title: "Rozjetý gauč", description: "10 kliknutí", clicks: 10 },
  { id: "a3", title: "Kobliha na zub", description: "50 kliknutí", clicks: 50 },
  { id: "a4", title: "Stovka v Moeově baru", description: "100 kliknutí", clicks: 100 },
  { id: "a5", title: "Springfieldská hvězda", description: "250 kliknutí", clicks: 250 },
  { id: "a6", title: "Jaderný technik", description: "500 kliknutí", clicks: 500 },
  { id: "a7", title: "Tisícovka Kwik-E-Mart", description: "1 000 kliknutí", clicks: 1000 },
  { id: "a8", title: "Krustyho fanoušek", description: "2 500 kliknutí", clicks: 2500 },
  { id: "a9", title: "Excelentní!", description: "5 000 kliknutí", clicks: 5000 },
  { id: "a10", title: "Legenda Springfieldu", description: "10 000 kliknutí", clicks: 10000 },
]

export const SKILLS: Skill[] = [
  { id: "s1", character: "Bart", title: "Skateboardový klik", perClick: 2, unlockAt: 25 },
  { id: "s2", character: "Líza", title: "Saxofonový klik", perClick: 5, unlockAt: 100 },
  { id: "s3", character: "Marge", title: "Klik z účesu", perClick: 10, unlockAt: 400 },
  { id: "s4", character: "Maggie", title: "Dudlíkový klik", perClick: 25, unlockAt: 1200 },
  { id: "s5", character: "Homer", title: "Koblihový klik", perClick: 50, unlockAt: 3500 },
  { id: "s6", character: "Pan Burns", title: "Excelentní klik", perClick: 100, unlockAt: 8000 },
]

export function getPerClick(score: number) {
  let value = 1
  for (const skill of SKILLS) {
    if (score >= skill.unlockAt) value = skill.perClick
  }
  return value
}

export function formatNumber(n: number) {
  return n.toLocaleString("cs-CZ")
}
