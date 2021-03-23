import Task from './Task';

const Tasks = ({tasks, onDelete}) => {
    return (
        <>
            {/* This outputs what is called a list */}
            {tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={onDelete}/>
            ))}  
        </>
    )
}

export default Tasks
