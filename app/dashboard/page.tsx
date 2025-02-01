"use client"

import { useSession } from "next-auth/react"
import LogoutInButton from "@/src/components/LogoutInButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"


export default function Dashboard() {
    /**
     * ! STATE (état, données) de l'application
     */
    // const { data: session } = useSession()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <p>bonjour</p>
            {/* <Avatar>
                <AvatarImage src={session?.user?.image ?? ''} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <h1>Vous êtes connecté avec ID : {session?.user?.id}</h1>
            <h1>{session?.user?.name}</h1>
            <p>{session?.user?.email}</p>
            <LogoutInButton /> */}
        </>
    )
}