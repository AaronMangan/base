import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import DangerButton from '@/Components/DangerButton';
import Badge from '@/Components/Badge';
import Sticker from '@/Components/Sticker';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function UserIndex({ users }) {
    const [editUser, setEditUser] = useState(false);
    const passwordInput = useRef();

    /**
     * Return the type based on role.
     * @param {*} type 
     * @returns 
     */
    const getType = (type) => {
        switch (type) {
            case 'admin':
                return 'success';
            default:
                return 'primary';
        }
    };

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

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
        setEditUser(false);

        clearErrors();
        reset();
    };

    /**
     * User Table Columns
     */
    const columns = [
        {
            name: '#',
            selector: row => row.id,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Email',
            selector: row => row.email
        },
        {
            name: 'Organisation',
            selector: row => row.organisation.name || 'Unknown'
        },
        {
            name: 'Role',
            cell: (data) => {
                return <Sticker type={getType(data.roles[0].name)} value={data.roles[0].name}></Sticker>
            },
        },
        {
            name: 'Status',
            cell: (data) => {
                return <Badge value={data.status.name.toUpperCase() || 'N/A'}></Badge>
            }
        },
        {
            name: 'Actions',
            cell: () => {
                return (
                    <>
                        <PrimaryButton className="mr-1" onClick={() => {setEditUser(true)}}>Edit</PrimaryButton>
                        <DangerButton onClick={() => {alert('To Do - Implement Delete')}}>Delete</DangerButton>
                    </>
                )
            },
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Users" />
            <>
                <div className="py-12">
                    <div className="z-0 mx-auto max-w-[95%] sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="z-0 p-2 text-gray-900 dark:text-gray-100">
                                <DataTable
                                    columns={columns}
                                    data={users}
                                    className='z-0'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>

            <Modal show={editUser} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="block w-3/4 mt-1"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}