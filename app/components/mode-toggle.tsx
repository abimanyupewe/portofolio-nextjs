"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative inline-flex h-9 w-16 items-center rounded-full bg-gray-200 p-1 transition-colors dark:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Toggle theme"
    >
        <span className="sr-only">Toggle theme</span>
        <span
            className={`${
            theme === "dark" ? "translate-x-7 bg-zinc-950" : "translate-x-0 bg-white"
            } pointer-events-none flex h-7 w-7 items-center justify-center rounded-full shadow-lg ring-0 transition-transform duration-200`}
        >
            {theme === "dark" ? (
                <Moon className="h-4 w-4 text-white" />
            ) : (
                <Sun className="h-4 w-4 text-orange-500" />
            )}
        </span>
    </button>
  )
}
