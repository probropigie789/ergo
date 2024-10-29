import { FormEvent, useState } from "react";

export default function UpdateTaskTester() {
    const [taskData, setTaskData] = useState({
        task_id: "",
        title: "",
        description: "",
        status: "pending" as "pending" | "in_progress" | "completed",
        priority: "low" as "low" | "medium" | "high",
        assigned_to: "",
        due_date: "",
        completion_date: "",
        metadata: "",
        n8n_data: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);
        setError(null);

        const metadataJson = taskData.metadata ? JSON.parse(taskData.metadata) : {};
        const n8nDataJson = taskData.n8n_data ? JSON.parse(taskData.n8n_data) : {};

        const response = await fetch("/api/update-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task_id: taskData.task_id,
                updatable_rows: {
                    title: taskData.title,
                    description: taskData.description,
                    status: taskData.status,
                    priority: taskData.priority,
                    assigned_to: taskData.assigned_to,
                    due_date: taskData.due_date,
                    completion_date: taskData.completion_date,
                    metadata: metadataJson,
                    n8n_data: n8nDataJson
                },
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            setError(result.error || "Error updating task");
        } else {
            setMessage("Task updated successfully");
            setData(result); // Save the updated task data
        }

        setIsSubmitting(false);
    };

    return (
        <div className="space-y-6 p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Task ID</label>
                    <input
                        type="text"
                        name="task_id"
                        value={taskData.task_id}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        value={taskData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                        name="priority"
                        value={taskData.priority}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                    <input
                        type="text"
                        name="assigned_to"
                        value={taskData.assigned_to}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        name="due_date"
                        value={taskData.due_date}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                    <input
                        type="date"
                        name="completion_date"
                        value={taskData.completion_date}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Metadata </label>
                    <textarea
                        name="metadata"
                        value={taskData.metadata}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">n8n Data </label>
                    <textarea
                        name="n8n_data"
                        value={taskData.n8n_data}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isSubmitting ? "Submitting..." : "Update Task"}
                </button>

                {message && <p className="mt-4 text-center text-sm font-medium text-green-600">{message}</p>}
                {error && <p className="mt-4 text-center text-sm font-medium text-red-600">{error}</p>}
            </form>

            {data && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 w-full max-w-[90vw]">
                    <h2 className="font-bold">Updated Task Data</h2>
                    <pre className="whitespace-pre-wrap break-all">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
