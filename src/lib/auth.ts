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


export const authOptions: NextAuthOptions = {
    // Adapter : pour la connexion à la base de données
    adapter: PrismaAdapter(prisma),

    // Provider : pour les fournisseurs d'authentification ou les identifiants personnalisés
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),

        // Ajouter un fournisseur d'authentification personnalisé
        CredentialsProvider({
            credentials: { email: {}, password: {} },

            async authorize(credentials) {
                
                // Valider les informations d'identification
                const validated = loginSchema.parse(credentials)

                // Rechercher l'utilisateur dans la base de données
                const user = await prisma.user.findUnique({
                    where: { email: validated.email },
                })

                if (!user) {
                    throw new Error("Aucun utilisateur trouvé avec cet e-mail.")
                }

                // Vérifier le mot de passe
                const isPasswordValid = await bcrypt.compare(validated.password, user.password || "");

                if (!isPasswordValid) {
                    throw new Error("Mot de passe incorrect.")
                }

                // Retourner l'utilisateur pour créer une session
                return user
            }
        }),
    ],

    callbacks: {
        async jwt({ token, account }) {

            if (account?.provider === "credentials") {
                token.credentials = true;
            }
            return token
        },
    },
    jwt: {
        encode: async function (params) {
            if (params.token?.credentials) {
                const sessionToken = uuid();

                if (!params.token.sub) {
                    throw new Error("No user ID found in token");
                }

                const createdSession = await PrismaAdapter(prisma).createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                });

                if (!createdSession) {
                    throw new Error("Failed to create session");
                }

                return sessionToken;
            }
            return defaultEncode(params);
        },
    },

    pages: {
        signIn: "/auth/login",
    },
}