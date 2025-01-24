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

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            {!session?.user ? (
                <SignInButton />
            ) : (
                <>
                    <Avatar>
                        <AvatarImage src={session?.user?.image ?? ''} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <h1>Vous êtes connecté avec ID : {session.user.id}</h1>
                    <h1>{session.user.name}</h1>
                    <p>{session.user.email}</p>
                    <LogoutInButton />
                </>
            )}
        </>
    )
}