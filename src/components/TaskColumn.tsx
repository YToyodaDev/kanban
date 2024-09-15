import React, { useState } from 'react';
import { TaskStatus } from '../type';
import DropArea from './DropArea';
import TaskCard from './TaskCard';
import './TaskColumn.css';
import { useTask } from '../context/TaskContext';

type Props = {
  title: string;
  icon?: string;
  status: TaskStatus;
};

function TaskColumn({ title, icon, status }: Props) {
  const { tasks, handleDrop } = useTask();
  // const { firstIndex, setFirstIndex } = useState<number>(0);
  return (
    <section className='task_column'>
      <h2 className='task_column_header'>
        <img className='task_column_icon' src={icon} />
        {title}
      </h2>
      <DropArea onDrop={handleDrop.bind(null, status, 0)} />

      {tasks.map(
        (task, index) =>
          task.status === status && (
            <React.Fragment key={index}>
              <TaskCard title={task.task} tags={task.tags} index={index} />
              <DropArea
                index={index}
                onDrop={handleDrop.bind(null, status, index + 1)}
              />
            </React.Fragment>
          )
      )}
    </section>
  );
}

export default TaskColumn;
