// Import useState and useEffect hooks from React
import { useState, useEffect } from 'react';

// Import the CSS file
import './App.css';

function App() {

    // State variable to store task name input
    const [task_name, setTask_name] = useState("");

    // State variable to store list of tasks
    const [tasks, setTasks] = useState([]);

    // Function to handle form submission
    const onSubmitForm = async e => {
        // Prevent default form submission behavior
        e.preventDefault();

        try {
            // Create request body with task_name
            const body = { task_name };
            await fetch("http://localhost:5000/task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";

        } catch (err) {
            // Log any errors to the console
            console.error(err.message);
        }
    }

    // Function to delete a task by its ID
       const deleteTask = async (taskId) => {
        console.log(taskId);
        try {
            const response = await fetch(`http://localhost:5000/task/${taskId}`, { method: "DELETE" });
            if (response.ok) {
                // Remove the deleted task from the state
                setTasks(tasks.filter(task => task.TaskID !== taskId));
            } else {
                console.error("Failed to delete task");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // Effect hook to fetch all tasks when the component mounts
    useEffect(() => {
        // Fetch all tasks when the component mounts
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:5000/allTasks", {
                    method: "GET"
                });
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        // Call fetchTasks function
        fetchTasks();
    }, []);

    return (
        // Container for the entire application
        <div className="container pt-5  w-75" >

            {/* Container for the todo list section*/}
            <div className=' todo-container  border border-light border-2 rounded-4 p-4  mt-5 mb-5  shadow '>

                {/* Header */}
                <h2 className='text-center  text-light fw-bold mb-4 '>ToDo List</h2>

                {/* Form for adding a new task, onSubmitForm function triggered on submit */}
                <form onSubmit={onSubmitForm} className='mb-4'>
                    <div className="row g-0 ">
                        <div className="col-9 col-sm-10  col-md-10 col-lg-11">
                            <input type="text" value={task_name} required className=" task-input text-center form-control" placeholder="Enter Task" onChange={(e) => setTask_name(e.target.value)} />
                        </div>
                        <div className="col-3 col-sm-2  col-md-2 col-lg-1">

                            {/* Button to add task */}
                            <button type="submit" className='btn fw-bold  add-button w-100  border  border-secondary-subtle  '>Add</button>
                        </div>
                    </div>

                </form>

                <ul className="task-list ">

                    {/* Mapping through tasks array to display each task */}
                    {tasks.map(task => (
                        <li key={task.TaskID}
                            className="task-item text-light border border-1 border-secondary-subtle rounded-2  d-flex justify-content-between  mb-3"
                        >
                            {` ${task.Task}`}
                            <i className="fa-regular fa-trash-can trash-can me-2"
                                onClick={() => { deleteTask(task.TaskID) }}></i>
                        </li>
                    ))}
                </ul>

            </div>
        </div>

    );

}
export default App;

