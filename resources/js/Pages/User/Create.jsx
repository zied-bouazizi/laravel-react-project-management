import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("user.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                    Create User
                </h2>
            }
        >
            <Head title="Create User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel htmlFor="user_name" value="User Name" />

                                <TextInput
                                    id="user_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("name", e.target.value)}
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="user_email"
                                    value="User Email"
                                />

                                <TextInput
                                    id="user_email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("email", e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="user_password"
                                    value="Password"
                                />

                                <TextInput
                                    id="user_password"
                                    type="password"
                                    name="password"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("password", e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="user_password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    id="user_password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                />

                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("user.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
