"use client";

import { useTheme } from "next-themes";
import { Sun, Monitor, MoonStar } from "lucide-react";


export default function ThemeSwitcher() {
    /**
     * ! STATE (état, données) de l'application
     */
    const { theme, setTheme } = useTheme()


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="flex items-center border p-1 rounded-full space-x-2">
            <Sun
                className={`cursor-pointer transition-all duration-300 ${theme === "light" ? "p-1 border rounded-full" : "w-4 h-4"
                    }`}
                onClick={() => setTheme("light")}
            />
            <Monitor
                className={`cursor-pointer transition-all duration-300 ${theme === "system" ? "p-1 border rounded-full" : "w-4 h-4"
                    }`}
                onClick={() => setTheme("system")}
            />
            <MoonStar
                className={`cursor-pointer transition-all duration-300 ${theme === "dark" ? "p-1 border rounded-full" : "w-4 h-4"
                    }`}
                onClick={() => setTheme("dark")}
            />
        </div>
    )
}