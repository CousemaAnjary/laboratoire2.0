import { Button } from "./ui/button"
import { signOut } from "next-auth/react"

export default function LogoutInButton() {
    /**
     * ! STATE (état, données) de l'application
     */


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <Button onClick={() => signOut({ callbackUrl: "/auth/login" })}>Sign out</Button>

    )
}