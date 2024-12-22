import { Button } from "@/components/ui/button"
import { Brain, PenLine, Share2, Star, HelpCircle } from 'lucide-react'
import { Link } from '@inertiajs/react';
import mySvg from '../images/outbox.svg';
import mySvgg from '../images/droping.svg';
import imageApp from '../images/image.png';

export default function Welcome({ auth}) {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b-4 border-black bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                    <div className="flex items-center gap-2">
                        <PenLine className="h-6 w-6 sm:h-8 sm:w-8" />
                        <span className="text-lg font-black sm:text-xl">NotesApp</span>
                    </div>
                    <nav className="-mx-3 flex flex-1 justify-end gap-5">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="border-2 border-black rounded bg-rose-500 px-3 py-1 me-5 text-xs font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none sm:px-4 sm:py-2 sm:text-sm"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="border-2 border-black rounded bg-[#FFD600] px-3 py-1 text-xs font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none sm:px-4 sm:py-2 sm:text-sm"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="border-2 border-black rounded bg-[#FFD600] px-3 py-1 me-5 text-xs font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none sm:px-4 sm:py-2 sm:text-sm"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="min-h-[calc(100vh-40vh)] bg-[#4ADE80] flex items-center justify-center sm:justify-start">
                    <div className="flex flex-col md:flex-row items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 gap-8">
                        {/* Text Column */}
                        <div className="flex-1 text-left">
                            <h1 className="mb-4 text-6xl font-black sm:font-bold sm:text-5xl md:text-5xl lg:text-6xl">
                                Capture Your Thoughts, Organize Your Life
                            </h1>
                            <p className="mb-6 text-base sm:text-lg md:mb-8">
                                Transform your ideas into organized, actionable notes. Our powerful note-taking app helps you stay productive and never miss an important thought.
                            </p>
                            <div className="flex flex-wrap gap-4 ">
                                <Link
                                    href={route('register')}
                                    className="border-2 border-black rounded bg-white px-6 py-4 text-md font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none sm:text-base"
                                >
                                    Start Taking Notes
                                </Link>
                                <Link
                                    href="#how-to-use"
                                    className="border-2 border-black rounded bg-transparent px-6 py-4 text-md font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none sm:text-base"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className="relative flex-1 flex justify-center md:justify-start mt-8 md:mt-0">
                            <div className="absolute right-0 top-0 h-20 w-20 bg-[#FFD600] hidden md:block animate-pulse sm:h-32 sm:w-32 md:h-48 md:w-48"></div>
                            <img
                                src={mySvg}
                                alt="Person organizing notes"
                                className="relative z-10 max-w-[80%] sm:max-w-[90%] md:max-w-lg hidden md:block"
                            />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-8 text-center text-3xl font-black sm:text-4xl md:text-5xl">
                            Powerful Features
                        </h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                            <div className="rounded-lg border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#4ADE80] text-2xl font-black animate-bounce">1</div>
                                <h3 className="mb-2 text-xl font-bold sm:text-2xl">Quick Capture</h3>
                                <p className="text-gray-600 sm:text-lg">
                                    Instantly capture your thoughts, ideas, and inspirations with our lightning-fast note editor. Never let a brilliant idea slip away again.
                                </p>
                            </div>
                            <div className="rounded-lg border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#FFD600] text-2xl font-black animate-bounce">2</div>
                                <h3 className="mb-2 text-xl font-bold sm:text-2xl">Smart Organization</h3>
                                <p className="text-gray-600 sm:text-lg">
                                    Automatically organize your notes with tags, categories, and powerful search. Find what you need when you need it.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-8 md:grid-cols-2">
                            <div>
                                <h2 className="mb-4 text-2xl font-black sm:text-3xl md:text-4xl">
                                    Why Taking Notes is Essential for Success
                                </h2>
                                <p className="mb-6 text-gray-600 sm:text-lg md:mb-8">
                                    Research shows that note-taking improves memory retention and helps organize thoughts effectively. Our app makes it easier than ever to maintain your digital notebook.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-black bg-[#4ADE80] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:rotate-3">
                                        <Brain className="h-8 w-8 sm:h-10 sm:w-10" />
                                    </div>
                                    <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-black bg-[#FFD600] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:rotate-3">
                                        <PenLine className="h-8 w-8 sm:h-10 sm:w-10" />
                                    </div>
                                    <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-black bg-[#A855F7] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:rotate-3">
                                        <Share2 className="h-8 w-8 sm:h-10 sm:w-10" />
                                    </div>
                                    <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-black bg-[#38BDF8] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:rotate-3">
                                        <Star className="h-8 w-8 sm:h-10 sm:w-10" />
                                    </div>
                                </div>
                            </div>
                            <div className="relative mt-8 md:mt-0">
                                <div className="absolute right-0 top-0 h-32 w-32 bg-[#FFD600] animate-pulse sm:h-40 sm:w-40 md:h-48 md:w-48"></div>
                                <img
                                    src={mySvgg}
                                    alt="Person organizing notes"
                                    className="relative z-10 translate-y-[20px] translate-x-5 md:translate-x-0 md:translate-y-0 sm:translate-y-0 sm:translate-x-0 max-w-full md:max-w-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Use Section */}
                <section id="how-to-use" className="bg-[#A855F7] py-12 sm:py-16 md:py-20 lg:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-8 text-center text-3xl font-black sm:text-4xl md:text-5xl text-white">
                            How to Use NotesApp
                        </h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-lg border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#4ADE80] text-2xl font-black">1</div>
                                <h3 className="mb-2 text-xl font-bold sm:text-2xl">Create an Account</h3>
                                <p className="text-gray-600 sm:text-lg">
                                    Sign up for a free account to start organizing your thoughts and ideas.
                                </p>
                            </div>
                            <div className="rounded-lg border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#FFD600] text-2xl font-black">2</div>
                                <h3 className="mb-2 text-xl font-bold sm:text-2xl">Create Your Type Plan</h3>
                                <p className="text-gray-600 sm:text-lg">
                                    Click the "Add Type" button and create a new type plan to organize your notes.
                                </p>
                            </div>
                            <div className="rounded-lg border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#A855F7] text-2xl font-black">3</div>
                                <h3 className="mb-2 text-xl font-bold sm:text-2xl">Create Your First Note</h3>
                                <p className="text-gray-600 sm:text-lg">
                                    Click the "Add Note" button and start typing. Add a title, content, and any relevant tags.
                                </p>
                            </div>
                        </div>
                        <div className="mt-12 text-center">
                            <Link  href={route('register')} >
                                <Button className="border-2 border-black bg-white px-6 py-3 text-lg font-bold hover:text-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                                Get Started Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* App Screenshot Section */}
                <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-8 text-center text-3xl font-black sm:text-4xl md:text-5xl">
                            See NotesApp in Action
                        </h2>
                        <div className="relative mx-auto max-w-4xl">
                            <div className="absolute inset-0 bg-[#4ADE80] transform rotate-3 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"></div>
                            <img
                                src={imageApp}
                                alt="NotesApp Screenshot"
                                className="relative z-10 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                            />
                        </div>
                    </div>
                </section>
                {/* FAQ Section */}
                <section id="faq" className="bg-[#FFD600] py-12 sm:py-16 md:py-20 lg:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-8 text-center text-3xl font-black sm:text-4xl md:text-5xl">
                            Frequently Asked Questions
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {[
                                {
                                    question: "Is my data secure?",
                                    answer: "Yes, we use industry-standard encryption to protect your data. Your notes are private and only accessible to you."
                                },
                                {
                                    question: "Can I access my notes offline?",
                                    answer: "Currently, you can only access your notes online using this website. Offline access is not supported."
                                },
                                {
                                    question: "Is there a limit to how many notes I can create?",
                                    answer: "No, there is no limit to the number of notes you can create. Feel free to create as many as you need."
                                },
                                {
                                    question: "Can I use this app for free?",
                                    answer: "Yes, this application is completely free to use, with no hidden charges or subscription plans."
                                }                                
                            ].map((item, index) => (
                                <div key={index} className="rounded-lg border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                    <h3 className="mb-2 text-xl font-bold flex items-center">
                                        <HelpCircle className="mr-2 h-6 w-6 text-[#FFD600]" />
                                        {item.question}
                                    </h3>
                                    <p className="text-gray-600">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t-4 border-black bg-white py-6 sm:py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2">
                            <PenLine className="h-5 w-5 sm:h-6 sm:w-6" />
                            <span className="text-base font-black sm:text-lg">NotesApp</span>
                        </div>
                        <nav className="flex space-x-4">
                            <Link href="#" className="text-xs font-bold hover:underline sm:text-sm">Privacy Policy</Link>
                            <Link href="#" className="text-xs font-bold hover:underline sm:text-sm">Terms of Service</Link>
                            <Link href="#" className="text-xs font-bold hover:underline sm:text-sm">Contact Us</Link>
                        </nav>
                        <div className="text-xs sm:text-sm">&copy; 2024 NotesApp || Ferynnd. All rights reserved.</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

