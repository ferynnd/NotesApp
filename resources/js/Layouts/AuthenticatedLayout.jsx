import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { PenLine } from 'lucide-react'


export default function AuthenticatedLayout({ header, children }) {
        const user = usePage().props.auth.user;
    
        const [showingNavigationDropdown, setShowingNavigationDropdown] =useState(false);
        const [showingUserMenu, setShowingUserMenu] = useState(false);

    return (
        <div className="container mx-auto">
            <nav className="border-b-4 border-black bg-white shadow-[0_4px_0_0_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between px-4 py-6">
                    <div className="flex items-center">
                        <Link href={route('dashboard')} >
                            <div className="flex items-center gap-2">
                                <PenLine className="h-6 w-6 sm:h-8 sm:w-8" />
                                <span className="text-lg font-black sm:text-xl">NotesApp</span>
                            </div>
                        </Link>
                    </div>
                    <div className="hidden sm:flex sm:items-center">
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Home
                        </NavLink>
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative">
                                <button
                                    onClick={() => setShowingUserMenu(!showingUserMenu)}
                                    className="flex items-center space-x-2 rounded-none border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none focus:outline-none"
                                >
                                    <span>{user.name}</span>
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {showingUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-none border-2 border-black bg-white py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <Link
                                            href={route('profile.edit')}
                                            className="block px-4 py-2 text-sm font-bold text-black hover:bg-black hover:text-white"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="block w-full px-4 py-2 text-left text-sm font-bold text-black hover:bg-black hover:text-white"
                                        >
                                            Log Out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                        className="inline-flex items-center justify-center rounded-none border-2 border-black p-2 text-black transition-colors hover:bg-black hover:text-white focus:outline-none sm:hidden"
                    >
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path
                                className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path
                                className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className={((showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden')}>
                    <div className="space-y-1 pb-3 pt-2 border-t-2 border-black">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Home
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t-2 border-black pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-bold text-black">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {children}
        </div>
    );
}

