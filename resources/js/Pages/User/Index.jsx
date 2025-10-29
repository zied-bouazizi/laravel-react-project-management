import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import Alert from "@/Components/Alert";
import { useState } from "react";
import ConfirmDelete from "@/Components/ConfirmDelete";

export default function Index({ users, queryParams = null, success, isOwner }) {
    queryParams = queryParams || {};

    const { auth } = usePage().props;
    const authUser = auth.user;

    const [confirmingUser, setConfirmingUser] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const { delete: destroy, processing } = useForm();

    const openDeleteModal = (user) => {
        setUserToDelete(user);
        setConfirmingUser(true);
    };

    const closeDeleteModal = () => {
        setUserToDelete(null);
        setConfirmingUser(false);
    };

    const deleteUser = () => {
        destroy(route("user.destroy", userToDelete.id), { 
            onSuccess: closeDeleteModal
        });
    };

    const searchFieldChanged = (name, value) => {
         if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("user.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "desc";
        }
        router.get(route("user.index"), queryParams);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Members
                    </h2>
                    {isOwner && (
                        <Link
                            href={route("user.create")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                        >
                            Create Member
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Members" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Alert message={success} />

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 shadow-sm">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>
                                            <TableHeading
                                                name="name"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>
                                            <TableHeading
                                                name="email"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Email
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Create Date
                                            </TableHeading>
                                            {isOwner && <th className="px-3 py-3">Actions</th>}
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.name}
                                                    placeholder="Member Name"
                                                    onBlur={(e) => searchFieldChanged("name", e.target.value)}
                                                    onKeyPress={(e) => onKeyPress("name", e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.email}
                                                    placeholder="Member Email"
                                                    onBlur={(e) => searchFieldChanged("email", e.target.value)}
                                                    onKeyPress={(e) => onKeyPress("email", e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            {isOwner && <th className="px-3 py-3"></th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.length === 0 && (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-2" colSpan={isOwner ? 5 : 4}>
                                                    <p className="text-center">No members found</p>
                                                </td>
                                            </tr>
                                        )}

                                        {users.data.map((user) => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
                                                <td className="px-3 py-2">{user.id}</td>
                                                <th className="px-3 py-2 text-gray-100 text-nowrap">{user.name}</th>
                                                <td className="px-3 py-2">{user.email}</td>
                                                <td className="px-3 py-2 text-nowrap">{user.created_at}</td>
                                                {isOwner && user.id === authUser.id ? (
                                                    <td className="px-3 py-2 text-nowrap">
                                                        <Link 
                                                            href={route("profile.edit")} 
                                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                                Manage Your Account
                                                        </Link>
                                                    </td>
                                                ) : (isOwner && !user.is_owner && (
                                                        <td className="px-3 py-2 text-nowrap">
                                                            <Link
                                                                href={route("user.edit", user.id)}
                                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => openDeleteModal(user)}
                                                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                            >
                                                                Delete
                                                            </button>
                                                            
                                                        </td>
                                                    ))
                                                }                                                     
                                             </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDelete
                show={confirmingUser}
                onClose={closeDeleteModal}
                onDelete={deleteUser}
                processing={processing}
                itemName="member"
            />
        </AuthenticatedLayout>
    );
}
