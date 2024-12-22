
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [activeTab, setActiveTab] = useState('account');

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-4xl font-black uppercase text-black">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex border-b-4 border-black">
                            <button
                                onClick={() => setActiveTab('account')}
                                className={`w-1/2 px-4 py-2 text-lg font-black uppercase transition-all ${
                                    activeTab === 'account'
                                        ? 'bg-black text-white'
                                        : 'bg-white text-black hover:bg-gray-100'
                                }`}
                            >
                                Account
                            </button>
                            <button
                                onClick={() => setActiveTab('password')}
                                className={`w-1/2 px-4 py-2 text-lg font-black uppercase transition-all ${
                                    activeTab === 'password'
                                        ? 'bg-black text-white'
                                        : 'bg-white text-black hover:bg-gray-100'
                                }`}
                            >
                                Password
                            </button>
                        </div>

                        <div className="p-6">
                            {activeTab === 'account' && (
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            )}

                            {activeTab === 'password' && (
                                <UpdatePasswordForm className="max-w-xl" />
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex border-b-4 border-black">
                            <DeleteUserForm className="max-w-xl w-1/2 px-6 py-4 text-lg font-black transition-all" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

