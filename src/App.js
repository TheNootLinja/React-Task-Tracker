import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
    // Below is what is known as a dependency array, here you would put
    // anything that you want to trigger useEffect when said thing changes
  }, [])

  // Fetching Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  // Fetching Single Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

// Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json();

  setTasks([...tasks, data])
}
// Delete Task From UI and the actual DB/DB file
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })

  setTasks(tasks.filter(task => task.id !== id))
}
// Toggle Reminder Function
const toggleReminder = async (id) => {
  // Fetching the task we want to toggle
  const taskToToggle = await fetchTask(id);
  // Updating the task and saving it to a variable
  const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder};
  // Using a PUT request to replace the task with the updated one with the desired reminder status
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    // These are the headers we need for the PUT request we are doing
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json();

  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
}
// Toggle Showing Add Form
const showAddForm = () => {
  setShowAddTask(!showAddTask);
}

  return (
    <Router>
    <div className="container">
      <Header onShow={showAddForm} showAdd={showAddTask}/>
      <Route path='/' exact render={(props) => (
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? 
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> 
          : 
          <p>No Tasks To Show!</p>}
        </>
      )} />
      <Route path='/about' component={About}/>
      <Footer />
    </div>
    </Router>
  );
}

export default App;