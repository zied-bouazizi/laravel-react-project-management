import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function MyTasks({ tasks, queryParams = null, success }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Tasks
                    </h2>
                    <Link
                        href={route("task.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="My Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 shadow-sm">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable
                                tasks={tasks}
                                success={success}
                                queryParams={queryParams}
                                inMyTasks={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
