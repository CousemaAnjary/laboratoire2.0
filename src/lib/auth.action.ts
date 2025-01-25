"use server"

import { signIn } from "./auth"

export const signInAction = async (provider: string, callbackUrl: string) => {
    // Connexion avec le fournisseur
    await signIn(provider, { callbackUrl: callbackUrl })
}