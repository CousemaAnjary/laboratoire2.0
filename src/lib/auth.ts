
import bcrypt from 'bcrypt'
import { prisma } from './prisma'
import { v4 as uuid } from 'uuid'
import { NextAuthOptions } from "next-auth"
import { loginSchema } from './validations/auth'
import { PrismaAdapter } from "@auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { encode as defaultEncode } from 'next-auth/jwt'
import CredentialsProvider from "next-auth/providers/credentials"
const SESSION_EXPIRATION_DAYS = parseInt(process.env.SESSION_EXPIRATION_DAYS || "30", 10);

export const authOptions: NextAuthOptions = {
    // Utilisation de Prisma pour la gestion des utilisateurs et sessions
    adapter: PrismaAdapter(prisma),

  

    // Configuration des fournisseurs d'authentification
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        // CredentialsProvider({
        //     credentials: { email: {}, password: {} },

        //     async authorize(credentials) {

        //         // Validation des données reçues via votre schéma (par exemple avec Zod)
        //         const validated = loginSchema.parse(credentials)

        //         // Vérifier si l'utilisateur existe dans la base de données
        //         const user = await prisma.user.findUnique({
        //             where: { email: validated.email },
        //         })

        //         if (!user) {
        //             throw new Error("Aucun utilisateur trouvé avec cet e-mail.")
        //         }

        //         // Vérifier le mot de passe
        //         const isPasswordValid = await bcrypt.compare(validated.password, user.password || "")

        //         if (!isPasswordValid) {
        //             throw new Error("Mot de passe incorrect.")
        //         }

        //         // Retourner l'utilisateur pour créer une session
        //         return user
        //     }
        // }),
    ],

    // callbacks: {
    //     async jwt({ token, user, account }) {
    //         // Indiquer que l'authentification via credentials a été utilisée
    //         if (account?.provider === "credentials") {
    //             token.credentials = true
    //         }
    //         // Ajouter l'ID utilisateur dans le token
    //         if (user) {
    //             token.id = user.id
    //         }
    //         return token
    //     },

    //     async session({ session, user }) {
    //         // Ajouter l'ID utilisateur à la session côté client
    //         if (session?.user) {
    //             session.user.id = user.id // Ajouter l'ID utilisateur à la session
    //         }
    //         return session
    //     }
    // },

    // jwt: {
    //     encode: async function (params) {
    //         // Gestion personnalisée du token pour l'authentification par credentials
    //         if (params.token?.credentials) {

    //             const sessionToken = uuid()

    //             if (!params.token.sub) {
    //                 console.error("Erreur : Aucun ID utilisateur trouvé dans le token.")
    //                 return defaultEncode(params)
    //             }

    //             await prisma.session.create({
    //                 data: {
    //                     sessionToken: sessionToken,
    //                     userId: params.token.sub,
    //                     expires: new Date(Date.now() + SESSION_EXPIRATION_DAYS * 24 * 60 * 60 * 1000),
    //                 },
    //             })

    //             return sessionToken
    //         }

    //         return defaultEncode(params)
    //     },
    // },


}