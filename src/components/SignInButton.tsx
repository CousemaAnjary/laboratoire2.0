import { Button } from "./ui/button"
import { signIn } from "next-auth/react"

export default function SignInButton() {
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


        <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>
    )
}