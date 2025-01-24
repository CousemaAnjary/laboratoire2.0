import { signOut } from "../lib/auth"
import { Button } from "./ui/button"

export default  function LogoutInButton() {
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
        <form>
            <Button
                formAction={async () => {
                    "use server"
                    await signOut()
                }
                }
            >
                Déconnexion
            </Button>
        </form>

    )
}