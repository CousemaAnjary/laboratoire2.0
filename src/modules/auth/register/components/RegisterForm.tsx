"use client"
import { z } from "zod"
import Link from "next/link"
import { useState } from "react"
import { register } from "../services"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Input } from "@/src/components/ui/input"
import { Eye, EyeOff, Loader } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/src/lib/validations/auth"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"


export default function RegisterForm() {
    /**
     * ! STATE (état, données) de l'application
     */
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            lastname: "",
            firstname: "",
            email: "",
            password: "",
        }
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleRegister = async (data: z.infer<typeof registerSchema>) => {

        // Affichage du loader pendant le chargement
        setLoading(true)

        // Envoi des données au service d'inscription
        const response = await register(data)

        if (response.success) {
            //  Enregistrement du message dans le stockage local
            localStorage.setItem("message", response.message)
            router.push("/auth/login")
        }

        // Désactivation du loader après le chargement
        setLoading(false)
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="relative w-full max-w-md p-8">
                <h1 className="mb-2 font-spaceGrotesk text-2xl font-medium">Inscription</h1>
                <p className="mb-4 font-spaceGrotesk text-sm font-medium text-muted-foreground">
                    Vous avez déjà un compte ? Accédez-y en cliquant <Link href="/auth/login" className="text-cyan-700 underline">ici</Link>
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)}>
                        <div className="grid gap-4">

                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-inter">Nom</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="ABDILLAH" className="bg-white font-inter shadow-sm dark:bg-zinc-950" />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-inter">Prénom</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Cousema Anjary" className="bg-white font-inter shadow-sm dark:bg-zinc-950" />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-inter">Adresse email</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="exemple@gmail.com" className="bg-white font-inter shadow-sm dark:bg-zinc-950" />
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

                            {/* <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-inter">Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    className="shadow-sm bg-white font-inter text-xs"
                                                    onChange={(e) => { field.onChange(e.target.files ? e.target.files[0] : null) }}
                                                />
                                            </FormControl>
                                            <FormMessage className="font-inter" />
                                        </FormItem>
                                    )}
                                />
                            </div> */}

                            <div className="grid">
                                <Button type="submit" className="w-full font-spaceGrotesk font-medium" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader className="mr-2 size-4 animate-spin" />
                                            Veuillez patienter
                                        </>
                                    ) : (
                                        "Créer un compte"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>

                </Form>
            </div>
        </>
    )
}