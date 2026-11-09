"use client"

import { useEffect, useRef } from "react"
import type { Skill } from "@/lib/game-data"

export function SpecialEvent({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const timer = setTimeout(onClose, 4500)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("keydown", onKey)
    }
  }, [skill, onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="special-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
      onClick={onClose}
    >
      <div
        className="comic-box pop-in flex max-w-lg flex-col items-center gap-3 rounded-[2rem] bg-yellow p-6 text-center md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <p id="special-title" className="comic-text text-5xl leading-none text-donut md:text-7xl">
          Zvláštní událost!
        </p>
        <p className="text-lg font-bold md:text-xl">
          {skill.character} ti odemkl{skill.character === "Líza" || skill.character === "Marge" || skill.character === "Maggie" ? "a" : ""} dovednost
        </p>
        <p className="comic-text text-4xl text-paper md:text-5xl">{skill.title}</p>
        <p className="comic-box rounded-full bg-paper px-5 py-1 text-xl font-bold">
          Každý klik teď přidá {"+"}
          {skill.perClick}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="comic-box mt-2 rounded-full bg-sky px-6 py-2 font-bold transition-transform active:translate-x-1 active:translate-y-1"
        >
          Woo-hoo, pokračovat!
        </button>
      </div>
    </div>
  )
}
