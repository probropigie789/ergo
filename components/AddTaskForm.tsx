import { FormEvent, useState } from 'react';

export default function AddTaskForm() {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        status: 'pending' as 'pending' | 'in_progress' | 'completed',
        priority: 'low' as 'low' | 'medium' | 'high',
        assigned_to: '',
        created_by: '',
        due_date: '',
        metadata: "",
        n8n_data: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
           
        }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);
        console.log("taskdata",taskData.metadata)
        const response = await fetch('/api/add-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...taskData,
                metadata: JSON.parse(taskData.metadata),
                n8n_data: JSON.parse(taskData.n8n_data)
            }),
        });

        const result = await response.json();
        console.log('API Response:', result);

        if (response.ok) {
            setMessage(result.message);
            setTaskData({
                title: '',
                description: '',
                status: 'pending',
                priority: 'medium',
                assigned_to: '',
                created_by: '',
                due_date: '',
                metadata: "",
                n8n_data: "",
            });
        }else {
            setMessage(result.error || 'Error creating task');  
        }
        setIsSubmitting(false);
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    id="status"
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
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                    id="priority"
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
                <label htmlFor="assigned_to" className="block text-sm font-medium text-gray-700">Assigned To (User ID)</label>
                <input
                    type="text"
                    id="assigned_to"
                    name="assigned_to"
                    value={taskData.assigned_to}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="created_by" className="block text-sm font-medium text-gray-700">Created By (User ID)</label>
                <input
                    type="text"
                    id="created_by"
                    name="created_by"
                    value={taskData.created_by}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                    type="datetime-local"
                    id="due_date"
                    name="due_date"
                    value={taskData.due_date}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="metadata" className="block text-sm font-medium text-gray-700">Metadata</label>
                <input
                    type="text"
                    id="metadata"
                    name="metadata"
                    value={taskData.metadata}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="n8n_data" className="block text-sm font-medium text-gray-700">n8ndata</label>
                <input
                    type="text"
                    id="n8n_data"
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
                {isSubmitting ? 'Submitting...' : 'Add Task'}
            </button>

            {message && <p className="mt-4 text-center text-sm font-medium text-green-600">{message}</p>}
        </form>
    );
};