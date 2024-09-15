'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { Task, TaskStatus } from '../type';

interface TaskContextType {
  activeCard: number | null;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  handleDelete: (taskIndex: number) => void;
  handleDrop: (status: TaskStatus, position: number) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const oldTasks = localStorage.getItem('tasks');
console.log(oldTasks);

function TaskProvider({ children }: Props) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>(
    (oldTasks && JSON.parse(oldTasks)) || []
  );

  function handleDelete(taskIndex: number) {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  }
  function handleDrop(status: TaskStatus, position: number) {
    console.log(
      `${activeCard} is going to place into ${status} and at the position ${position}`
    );
    if (activeCard == null || activeCard === undefined) return;
    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((_, index) => index !== activeCard);

    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status,
    });

    setTasks(updatedTasks);
  }
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        activeCard,
        setActiveCard,
        tasks,
        setTasks,
        handleDelete,
        handleDrop,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTask() {
  const context = useContext(TaskContext) as TaskContextType;
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}

export { TaskProvider, useTask };
