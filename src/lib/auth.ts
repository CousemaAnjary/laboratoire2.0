import NextAuth from "next-auth"
import { prisma } from './prisma'
import Github from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"


export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Github],
})