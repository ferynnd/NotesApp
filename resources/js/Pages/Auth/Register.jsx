import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#f7f7f7] p-6 md:p-10">
            <div className="w-full max-w-md">
                <Head title="Register" />

                <div className="overflow-hidden border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="mb-6 text-3xl font-black uppercase">Register</h2>
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="mb-2 block text-sm font-bold uppercase">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full border-2 border-black p-2 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="mb-2 block text-sm font-bold uppercase">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full border-2 border-black p-2 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="mb-2 block text-sm font-bold uppercase">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full border-2 border-black p-2 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password_confirmation" className="mb-2 block text-sm font-bold uppercase">
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full border-2 border-black p-2 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Link
                                href={route('login')}
                                className="text-sm font-bold uppercase text-black underline underline-offset-4 hover:text-gray-700"
                            >
                                Already registered?
                            </Link>

                            <button
                                type="submit"
                                className="rounded-none border-2 border-black bg-black px-4 py-2 text-sm font-bold uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-white hover:text-black hover:shadow-none focus:outline-none disabled:opacity-25"
                                disabled={processing}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

