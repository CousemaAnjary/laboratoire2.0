"use client"
import { z } from "zod"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"
import { Input } from "@/src/components/ui/input"
import { Eye, EyeOff, Loader } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/src/lib/validations/auth"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"



export default function LoginForm() {
    /**
     * ! STATE (état, données) de l'application
     */
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleLogin = async (data: z.infer<typeof loginSchema>) => {
        // try {
        //     await signIn("credentials", {
        //         redirect: true,
        //         email: data.email,
        //         password: data.password,
        //         callbackUrl: '/dashboard'
        //     })


        // } catch (error) {
        //     console.error("Error logging in with credentials", error)

        // }
    }

    const handleProviderLogin = async (provider: string) => {
        // Affichage du loader pendant le chargement
        setLoading(true)

        try {
            // Connexion avec le fournisseur
            await signIn(provider, { callbackUrl: '/dashboard' })

        } catch (error) {
            console.error("Error logging in with provider", error)

        } finally {
            // Désactivation du loader
            setLoading(false)
        }
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="relative w-full max-w-md p-8">
            <h1 className="mb-2 font-spaceGrotesk text-2xl font-medium ">Se connecter</h1>
            <p className="mb-4">
                Connectez-vous à votre compte pour accéder à votre espace personnel
            </p>
            <p className="mb-4 font-spaceGrotesk  text-sm font-medium text-muted-foreground">
                Vous n&apos;avez pas de compte ? Inscrivez-vous en cliquant <Link href="/auth/register" className="text-cyan-700 underline">ici</Link>
            </p>

            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleLogin)}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Adresse email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="exemple@gmail.com" className=" bg-white font-inter shadow-sm dark:bg-zinc-950" />
                                        </FormControl>
                                        <FormMessage className="font-inter" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-9 gap-2">
                            <div className="col-span-8 grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-inter">Mot de passe</FormLabel>
                                            <FormControl>
                                                <Input {...field} type={showPassword ? "text" : "password"} placeholder="Entrez votre mot de passe" className="bg-white font-inter shadow-sm dark:bg-zinc-950" />
                                            </FormControl>
                                            <FormMessage className="font-inter" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-1 grid">
                                <Button type="button" variant="outline" size={"icon"} className="mt-8" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </Button>
                            </div>
                        </div>

                        <div className="grid">
                            <Button type="submit" className="w-full font-inter" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader className="mr-2 size-4 animate-spin" />
                                        Veuillez patienter
                                    </>
                                ) : (
                                    "Connexion"
                                )}

                            </Button>
                        </div>
                        <div className="relative">
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 font-inter text-muted-foreground">Ou continuer avec</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="grid gap-2">
                                <Button type="button" variant="outline" className="w-full font-inter" onClick={() => handleProviderLogin("google")}>
                                    <FcGoogle size={18} /> Google
                                </Button>
                            </div>
                            <div className="grid gap-2">
                                <Button type="button" variant="outline" className="w-full font-inter" onClick={() => handleProviderLogin("github")}>
                                    <FaGithub size={18} /> Github
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}