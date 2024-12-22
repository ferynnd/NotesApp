import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#f7f7f7] p-6 md:p-10">
            <div className="w-full max-w-md">
                <Head title="Log in" />

                {status && (
                    <div className="mb-4 border-2 border-green-500 bg-green-100 p-2 text-sm font-bold text-green-700">
                        {status}
                    </div>
                )}

                <div className="overflow-hidden border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="mb-6 text-3xl font-black uppercase">Log in</h2>
                    <form onSubmit={submit}>
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
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="mr-2 h-4 w-4 border-2 border-black"
                            />
                            <label htmlFor="remember" className="text-sm font-bold">
                                Remember me
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-bold uppercase text-black underline underline-offset-4 hover:text-gray-700"
                                >
                                    Forgot password?
                                </Link>
                            )}

                            <button
                                type="submit"
                                className="rounded-none border-2 border-black bg-black px-4 py-2 text-sm font-bold uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-white hover:text-black hover:shadow-none focus:outline-none disabled:opacity-25"
                                disabled={processing}
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <span className="text-sm font-bold">Don't have an account? </span>
                    <Link
                        href={route('register')}
                        className="text-sm font-bold uppercase text-black underline underline-offset-4 hover:text-gray-700"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

