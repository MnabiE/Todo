import React, { useState } from 'react';

export const Todo = () => {
    const [task, setTask] = useState("");
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);

    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    const addTask = (e) => {
        e.preventDefault();

        if (!task.trim()) return; // Prevent empty tasks

        if (editId) {
            // Update task if editId exists
            const updatedTasks = data.map((t) =>
                t.id === editId ? { id: t.id, name: task } : t
            );
            setData(updatedTasks);
            setEditId(null);  // Clear edit mode
        } else {
            // Add new task if not in edit mode
            setData([...data, { id: Date.now(), name: task }]);
        }
        setTask("");  // Clear input field
    };

    const deleteTask = (id) => {
        const filtered = data.filter((t) => t.id !== id);
        setData(filtered);
    };

    const editTask = (id) => {
        const toFind = data.find((t) => t.id === id);

        if (toFind) {
            setTask(toFind.name);
            setEditId(id);  // Set the task to edit mode
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="bg-white text-black p-8 rounded-lg shadow-lg w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">To-Do List</h1>
                <form onSubmit={addTask} className="mb-4">
                    <input
                        onChange={handleInputChange}
                        type="text"
                        value={task}
                        placeholder="Enter a task"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md text-black"
                    />
                    <button 
                        type="submit"
                        className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 transition-all"
                    >
                        {editId ? "Update" : "Add"}
                    </button>
                </form>

                <ul className="space-y-4">
                    {data.map((t) => (
                        <li key={t.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                            <span>{t.name}</span>
                            <div className="space-x-2">
                                <button
                                    onClick={() => editTask(t.id)}
                                    className="px-3 py-1 bg-black text-white rounded-md hover:bg-gray-700 transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTask(t.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
