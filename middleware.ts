import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// Définition des routes publiques (accessible sans authentification)
const publicRoutes = ["/", "/auth/login", "/auth/register"];

// Définition des routes privées (nécessitant une authentification)
const privateRoutes = ["/dashboard"]

export async function middleware(request: NextRequest) {
    // Récupérer le token d'authentification (si l'utilisateur est connecté)
    const token = await getToken({ req: request })

    // Récupérer l'URL actuelle
    const { pathname } = request.nextUrl

    // Vérifier si la route est publique → accès libre
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next()
    }

    // Vérifier si la route est privée et que l'utilisateur n'est pas authentifié
    if (privateRoutes.includes(pathname) && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    return NextResponse.next()
}


// Appliquer le middleware sur toutes les routes définies
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}