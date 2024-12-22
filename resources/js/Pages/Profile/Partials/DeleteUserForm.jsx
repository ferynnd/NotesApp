// import DangerButton from '@/Components/DangerButton';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import Modal from '@/Components/Modal';
// import SecondaryButton from '@/Components/SecondaryButton';
// import TextInput from '@/Components/TextInput';
// import { useForm } from '@inertiajs/react';
// import { useRef, useState } from 'react';

// export default function DeleteUserForm({ className = '' }) {
//     const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
//     const passwordInput = useRef();

//     const {
//         data,
//         setData,
//         delete: destroy,
//         processing,
//         reset,
//         errors,
//         clearErrors,
//     } = useForm({
//         password: '',
//     });

//     const confirmUserDeletion = () => {
//         setConfirmingUserDeletion(true);
//     };

//     const deleteUser = (e) => {
//         e.preventDefault();

//         destroy(route('profile.destroy'), {
//             preserveScroll: true,
//             onSuccess: () => closeModal(),
//             onError: () => passwordInput.current.focus(),
//             onFinish: () => reset(),
//         });
//     };

//     const closeModal = () => {
//         setConfirmingUserDeletion(false);

//         clearErrors();
//         reset();
//     };

//     return (
//         <section className={`space-y-6 ${className}`}>
//             <header>
//                 <h2 className="text-lg font-bold text-gray-900">
//                     Delete Account
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-600">
//                     Once your account is deleted, all of its resources and data
//                     will be permanently deleted. Before deleting your account,
//                     please download any data or information that you wish to
//                     retain.
//                 </p>
//             </header>

//             <DangerButton onClick={confirmUserDeletion}>
//                 Delete Account
//             </DangerButton>

//             <Modal show={confirmingUserDeletion} onClose={closeModal}>
//                 <form onSubmit={deleteUser} className="p-6">
//                     <h2 className="text-lg font-medium text-gray-900">
//                         Are you sure you want to delete your account?
//                     </h2>

//                     <p className="mt-1 text-sm text-gray-600">
//                         Once your account is deleted, all of its resources and
//                         data will be permanently deleted. Please enter your
//                         password to confirm you would like to permanently delete
//                         your account.
//                     </p>

//                     <div className="mt-6">
//                         <InputLabel
//                             htmlFor="password"
//                             value="Password"
//                             className="sr-only"
//                         />

//                         <TextInput
//                             id="password"
//                             type="password"
//                             name="password"
//                             ref={passwordInput}
//                             value={data.password}
//                             onChange={(e) =>
//                                 setData('password', e.target.value)
//                             }
//                             className="mt-1 block w-3/4"
//                             isFocused
//                             placeholder="Password"
//                         />

//                         <InputError
//                             message={errors.password}
//                             className="mt-2"
//                         />
//                     </div>

//                     <div className="mt-6 flex justify-end">
//                         <SecondaryButton onClick={closeModal}>
//                             Cancel
//                         </SecondaryButton>

//                         <DangerButton className="ms-3" disabled={processing}>
//                             Delete Account
//                         </DangerButton>
//                     </div>
//                 </form>
//             </Modal>
//         </section>
//     );
// }


import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-2xl font-black text-black ">Delete Account</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted.
                </p>
            </header>

            <button
                onClick={confirmUserDeletion}
                className="rounded-none border-2 border-red-500 bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-white hover:text-red-500 hover:shadow-none focus:outline-none"
            >
                Delete Account
            </button>

            {confirmingUserDeletion && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

                        <div className="inline-block transform overflow-hidden border-4 border-black bg-white text-left align-bottom shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                            <form onSubmit={deleteUser} className="p-6">
                                <h3 className="text-2xl font-black text-black">
                                    Are you sure you want to delete your account?
                                </h3>

                                <p className="mt-4 text-sm text-gray-600">
                                    Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                                </p>

                                <div className="mt-6">
                                    <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="mt-1 block w-full border-2 border-black p-2 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        className="mr-3 rounded-none border-2 border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-gray-50 hover:shadow-none focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-none border-2 border-red-500 bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-white hover:text-red-500 hover:shadow-none focus:outline-none disabled:opacity-25"
                                        disabled={processing}
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

