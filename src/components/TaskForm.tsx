import { useState } from 'react';
import Tag from './Tag';
import './TaskForm.css';
import { Task, TaskStatus } from '../type';
const tagsData = ['HTML', 'CSS', 'JavaScript', 'React'];

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
const defaultData = {
  task: '',
  status: TaskStatus.Todo,
  tags: [],
};

function TaskForm({ setTasks }: Props) {
  const [taskData, setTaskData] = useState<Task>(defaultData);

  function checkTag(tag: string) {
    return taskData.tags.includes(tag);
  }
  function selectTag(tag: string) {
    setTaskData((prev) => {
      const isTagSelected = prev.tags.includes(tag);
      const updatedTags = isTagSelected
        ? prev.tags.filter((item) => item !== tag)
        : [...prev.tags, tag];

      return { ...prev, tags: updatedTags };
    });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]:
        name === 'status' &&
        Object.values(TaskStatus).includes(value as TaskStatus)
          ? (value as TaskStatus)
          : value,
    }));

    console.log(name, value);
  }
  // assigned to <form> to handel both 'enter' and 'button' click
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTasks((prev) => [...prev, taskData]);
    setTaskData(defaultData);
  }

  return (
    <header className='app_header '>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          name='task'
          value={taskData.task}
          className='task_input  '
          placeholder='Enter your task'
          onChange={(e) => handleChange(e)}
        />
        <div className='task_form_bottom_line'>
          <div>
            {tagsData.map((tag, index) => (
              <Tag
                key={index}
                tagName={tag}
                selectTag={() => selectTag(tag)}
                selected={checkTag(tag)}
              />
            ))}
          </div>
          <div>
            <select
              name='status'
              value={taskData.status}
              className='task_status'
              onChange={(e) => handleChange(e)}
            >
              <option value='todo'>To do</option>
              <option value='doing'>Doing</option>
              <option value='done'>Done</option>
            </select>
            <button type='submit' className='task_submit'>
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
}

export default TaskForm;
