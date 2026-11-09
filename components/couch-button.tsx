"use client"

import { useRef, useState } from "react"
import Image from "next/image"

type Floater = { id: number; x: number; y: number; value: number }

export function CouchButton({ onPress }: { onPress: () => number }) {
  const [floaters, setFloaters] = useState<Floater[]>([])
  const [pressed, setPressed] = useState(false)
  const nextId = useRef(0)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = onPress()
    const rect = e.currentTarget.getBoundingClientRect()
    const isKeyboard = e.clientX === 0 && e.clientY === 0
    const x = isKeyboard ? rect.width / 2 : e.clientX - rect.left
    const y = isKeyboard ? rect.height / 2 : e.clientY - rect.top
    const id = nextId.current++
    setFloaters((f) => [...f.slice(-15), { id, x, y, value }])
    setTimeout(() => setFloaters((f) => f.filter((fl) => fl.id !== id)), 900)
    setPressed(true)
    setTimeout(() => setPressed(false), 90)
  }

  return (
    <div className="relative w-full max-w-2xl">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Ultra tlačítko – klikni na gauč a přidej body"
        className={`comic-box relative block w-full cursor-pointer select-none overflow-hidden rounded-[2rem] bg-paper pb-14 transition-transform duration-75 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-ink ${
          pressed ? "scale-95" : "hover:scale-[1.02]"
        }`}
      >
        <Image
          src="/images/couch-family.png"
          alt=""
          width={1408}
          height={768}
          priority
          draggable={false}
          className="pointer-events-none h-auto w-full"
        />
        <span className="comic-box comic-text absolute bottom-2 left-1/2 -translate-x-1/2 rotate-[-4deg] rounded-full bg-donut px-6 py-1 text-3xl text-yellow md:text-4xl">
          Ultra klik!
        </span>
        {floaters.map((f) => (
          <span
            key={f.id}
            aria-hidden="true"
            className="comic-text float-up pointer-events-none absolute text-4xl text-yellow"
            style={{ left: f.x, top: f.y - 30 }}
          >
            {"+"}
            {f.value}
          </span>
        ))}
      </button>
    </div>
  )
}
