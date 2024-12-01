import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import DangerButton from '@/Components/DangerButton';
import Badge from '@/Components/Badge';
import Sticker from '@/Components/Sticker';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import { useRef, useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function UserIndex({ auth, users }) {
    const [editUser, setEditUser] = useState(false);
    const [activeUser, setActiveUser] = useState({});
    const [isDisabled, setIsDisabled] = useState(false);
    const [userList, setUserList] = useState({});

    /**
     * Return the type based on role.
     * @param {*} type 
     * @returns 
     */
    const getType = (type) => {
        switch (type) {
            case 'super':
                return 'danger';
            case 'admin':
                return 'success';
            default:
                return 'primary';
        }
    };

    /**
     * Delete the user.
     * Only admin's and super admins can perform this action.
     * @param {*} user 
     */
    const handleDeleteUser = (user) => {
        axios.delete(route('user.destroy', user.id)).then(resp => {
            if(resp.data.status == 'success') {
                setUserList(users.filter(x => x.id != user.id));
            }
        }).then(() => {
            toast.success('User deleted successfully')
        })
    };

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        name: activeUser.name || '',
        email: activeUser.email || '',
    });
    
    const postUser = (e) => {
        e.preventDefault();
        post(route('user.edit', activeUser.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("User was saved successfully!");
                closeModal();
            },
            onError: () => null,
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
            cell: (row) => {
                return (
                    <>
                        <PrimaryButton disabled={isDisabled} className="mr-1" onClick={() => {
                            // Set the data.
                            setData({
                                name: row.name || '',
                                email: row.email || ''
                            })
                            setEditUser(true);
                            setActiveUser(row);
                        }}>Edit</PrimaryButton>
                        <DangerButton onClick={() => {handleDeleteUser(row)}}>Delete</DangerButton>
                    </>
                )
            },
        }
    ];

    /**
     * Runs when the component is mounted and when the dependencies listed change.
     */
    useEffect(() => {
        // 
        const roles = auth.user.roles?.map(r => {return r.name});
        setIsDisabled(roles.includes('super') || roles.includes('admin') ? false : true);
        setUserList(users);
    }, [auth, users]);

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
                                    data={userList}
                                    className='z-0'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>

            <Modal show={editUser} onClose={closeModal}>
                <form onSubmit={postUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Edit User ({activeUser.name})
                    </h2>

                    {/* User name field */}
                    <div className="mt-6">
                        <InputLabel
                            htmlFor="name"
                            value="Name"
                            className=""
                        />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            className="block w-full mt-1"
                            isFocused
                            placeholder="User name"
                        />
                        {errors && errors.name && <InputError
                            message={errors.name}
                            className="mt-2"
                        />}
                    </div>

                    {/* User email field */}
                    <div className="mt-6">
                        <InputLabel
                            htmlFor="email"
                            value="e-mail"
                            className=""
                        />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.email}
                            onChange={(e) =>
                                setData('email', e.target.value)
                            }
                            className="block w-full mt-1"
                            isFocused
                            placeholder="User name"
                        />
                        {errors && errors.email && <InputError
                            message={errors.email}
                            className="mt-2"
                        />}
                    </div>

                    {/* Buttons to handle saving or cancelling */}
                    <div className="flex justify-end mt-6">
                        {/* Save the changes to the user */}
                        <PrimaryButton className="mr-2" disabled={processing}>
                            Save
                        </PrimaryButton>
                        
                        {/* Cancel */}
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}