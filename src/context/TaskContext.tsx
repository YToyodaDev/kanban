'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { Task, TaskStatus } from '../type';

type ActiveCard = {
  arrIdx: number;
  colIdx: number;
  status: TaskStatus;
};

interface TaskContextType {
  activeCard: ActiveCard | null;
  setActiveCard: React.Dispatch<React.SetStateAction<ActiveCard | null>>;
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
  const [activeCard, setActiveCard] = useState<ActiveCard | null>(null);
  const [tasks, setTasks] = useState<Task[]>(
    (oldTasks && JSON.parse(oldTasks)) || []
  );

  function handleDelete(taskIndex: number) {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  }
  function handleDrop(status: TaskStatus, position: number) {
    if (activeCard === null || activeCard?.arrIdx === null) return;

    const { arrIdx } = activeCard;
    const taskToMove = tasks[arrIdx];

    const updatedTasks = tasks.filter((_, index) => index !== arrIdx);

    const adjustedPosition = position > arrIdx ? position - 1 : position;

    updatedTasks.splice(adjustedPosition, 0, {
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
