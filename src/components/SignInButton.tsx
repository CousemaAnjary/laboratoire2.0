import { signIn } from "../lib/auth"
import { Button } from "./ui/button"

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
        <>
            <Button
                formAction={async () => {
                    "use server"
                    await signIn("github")
                }
                }
            >
                Sign in with GitHub
            </Button>
        </>
    )
}