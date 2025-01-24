import { auth } from "../lib/auth"
import LogoutInButton from "./LogoutInButton"
import SignInButton from "./SignInButton"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default async function LoggedInButton() {
    /**
     * ! STATE (état, données) de l'application
     */
    const session = await auth()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    if (!session?.user) {
        <SignInButton />
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <Avatar>
                <AvatarImage src={session?.user?.image ?? ''} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <LogoutInButton />
        </>
    )
}