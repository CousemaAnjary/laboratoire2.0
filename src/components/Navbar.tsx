import Link from 'next/link'
import { Button } from './ui/button'
import ThemeSwitcher from './ThemeSwitcher'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "./ui/select"
import { Contact, House, Info, LayoutTemplate, LogIn, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu"



export default function Navbar() {
    /**
     * ! STATE (état, données) de l'application
     */


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <nav className="flex justify-between items-center relative bg-white dark:bg-zinc-950 h-14 border mt-4 mx-auto w-full max-w-5xl rounded-full">

            {/* Logo et Menu */}
            <div className="flex items-center ms-5">
                <LayoutTemplate />
                <ul className='flex space-x-1 ms-2'>
                    <li>
                        <Link href="/">
                            <Button variant={'ghost'} className='flex items-center font-spaceGrotesk'>
                                <House className="w-3 h-3" />
                                <span>Accueil</span>
                            </Button>

                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <Button variant={'ghost'} className='flex items-center font-spaceGrotesk'>
                                <Info className="w-3 h-3" />
                                <span>A propos de moi</span>
                            </Button>

                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <Button variant={'ghost'} className='flex items-center font-spaceGrotesk'>
                                <Contact className="w-3 h-3" />
                                <span>Contact</span>
                            </Button>
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size={'icon'}
                            variant={'secondary'}
                            className="rounded-full border mr-5 text-gray-600 dark:text-gray-200 dark:border-gray-600"
                        >
                            <User />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-72 mt-2">
                        <DropdownMenuGroup className='space-y-3 p-2'>
                            {/* Theme Section */}
                            <div className="flex justify-between items-center">
                                <span className='font-spaceGrotesk text-sm'>Thème</span>
                                <ThemeSwitcher />
                            </div>

                            {/* Language Section */}
                            <div className="flex justify-between items-center">
                                <span className='font-spaceGrotesk text-sm'>Langue</span>
                                <Select defaultValue="fr">
                                    <SelectTrigger className="w-[130px] h-7 font-spaceGrotesk">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup className='font-spaceGrotesk'>
                                            <SelectItem value="fr">🇫🇷 Français</SelectItem>
                                            <SelectItem value="en">🇬🇧 English</SelectItem>
                                            <SelectItem value="es">🇲🇬 Malagasy</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        {/* Login Section */}
                        <Link href="/auth/login">
                            <DropdownMenuItem className="font-spaceGrotesk font-medium">
                                <div className="flex items-center space-x-2">
                                    <LogIn className="w-4 h-4" />
                                    <span>Se connecter</span>
                                </div>
                                <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </nav>
    )
}