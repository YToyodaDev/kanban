import React from 'react';
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
      <DropArea
        onDrop={handleDrop.bind(null, status, 0)}
        arrIdx={0}
        colIdx={1}
        status={status}
      />
      {(() => {
        let colIdx = 0; // Track index within the current column
        return tasks.map((task, arrIdx) => {
          if (task.status === status) {
            colIdx++; // Increment for the next matching task

            return (
              <React.Fragment key={arrIdx}>
                <TaskCard task={task} colIdx={colIdx} arrIdx={arrIdx} />
                <DropArea
                  arrIdx={arrIdx}
                  colIdx={colIdx + 1}
                  status={status}
                  onDrop={handleDrop.bind(null, status, arrIdx + 1)}
                />
              </React.Fragment>
            );
          }
          return null; // Skip tasks that don't match the status
        });
      })()}
    </section>
  );
}

export default TaskColumn;
