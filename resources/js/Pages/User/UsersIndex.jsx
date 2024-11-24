import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import DangerButton from '@/Components/DangerButton';
import Badge from '@/Components/Badge';

export default function UserIndex({ users }) {
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
            name: 'Organisaiton',
            selector: row => row.organisation.name || 'Unknown'
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
                        <PrimaryButton className="mr-1" onClick={() => {alert('ToDo')}}>Edit</PrimaryButton>
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
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <DataTable
                                    columns={columns}
                                    data={users}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AuthenticatedLayout>
    );
}