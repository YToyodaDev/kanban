import React from 'react';
import { Task, TaskStatus } from '../type';
import DropArea from './DropArea';
import TaskCard from './TaskCard';
import './TaskColumn.css';

type Props = {
  title: string;
  icon?: string;
  tasks: Task[];
  status: TaskStatus;
  handleDelete: (index: number) => void;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  onDrop: (status: TaskStatus, position: number) => void;
};

function TaskColumn({
  title,
  icon,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop,
}: Props) {
  return (
    <section className='task_column'>
      <h2 className='task_column_header'>
        <img className='task_column_icon' src={icon} />
        {title}
      </h2>
      <DropArea onDrop={onDrop.bind(null, status, 0)} />
      {tasks.map(
        (task, index) =>
          task.status === status && (
            <React.Fragment key={index}>
              <TaskCard
                title={task.task}
                tags={task.tags}
                index={index}
                onDelete={handleDelete.bind(null, index)}
                setActiveCard={setActiveCard}
              />
              <DropArea
                index={index}
                onDrop={onDrop.bind(null, status, index + 1)}
                status={status}
              />
            </React.Fragment>
          )
      )}
    </section>
  );
}

export default TaskColumn;
