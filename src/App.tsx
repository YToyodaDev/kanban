import './App.css';
import TaskColumn from './components/TaskColumn';
import TaskForm from './components/TaskForm';
import TodoIcon from './assets/direct-hit.png';
import DoneIcon from './assets/check-mark-button.png';
import DoingIcon from './assets/glowing-star.png';
import { useState, useEffect } from 'react';
import { Task, TaskStatus } from './type';

const oldTasks = localStorage.getItem('tasks');
console.log(oldTasks);

function App() {
  const [tasks, setTasks] = useState<Task[]>(
    (oldTasks && JSON.parse(oldTasks)) || []
  );

  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleDelete(taskIndex: number) {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  }
  function onDrop(status: TaskStatus, position: number) {
    console.log(
      `${activeCard} is going to place into ${status} and at the position ${position}`
    );
    if (activeCard == null || activeCard === undefined) return;
    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((task, index) => index !== activeCard);

    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status,
    });

    setTasks(updatedTasks);
  }

  return (
    <div className='app'>
      <TaskForm setTasks={setTasks} />

      <main className='app_main'>
        <TaskColumn
          title='To do'
          icon={TodoIcon}
          tasks={tasks}
          status={TaskStatus.Todo}
          setActiveCard={setActiveCard}
          handleDelete={handleDelete}
          onDrop={onDrop}
        />
        <TaskColumn
          title='Doing'
          icon={DoingIcon}
          tasks={tasks}
          status={TaskStatus.Doing}
          setActiveCard={setActiveCard}
          handleDelete={handleDelete}
          onDrop={onDrop}
        />
        <TaskColumn
          title='Done'
          icon={DoneIcon}
          tasks={tasks}
          status={TaskStatus.Done}
          setActiveCard={setActiveCard}
          handleDelete={handleDelete}
          onDrop={onDrop}
        />
      </main>
      <h1>{activeCard}</h1>
    </div>
  );
}

export default App;
