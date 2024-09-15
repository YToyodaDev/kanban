import Tag from './Tag';
import './TaskCard.css';
import deleteIcon from '../assets/delete.png';
import { useTask } from '../context/TaskContext';
import { Task } from '../type';

interface Props {
  task: Task;
  arrIdx: number;
  colIdx: number;
}

function TaskCard({
  arrIdx,
  colIdx,
  task: { task: title, tags, status },
}: Props) {
  const { setActiveCard, handleDelete } = useTask();
  const onDelete = handleDelete.bind(null, arrIdx);
  return (
    <article
      className='task_card'
      draggable
      onDragStart={() =>
        setActiveCard((prev) => ({ ...prev, arrIdx, colIdx, status }))
      }
      onDragEnd={() => setActiveCard(null)}
    >
      <p className='task_text'>
        {/* {colIdx} */}
        <span> {title}</span>
        {arrIdx}
      </p>
      <div className='task_card_bottom_line '>
        <div className='task_card_tags'>
          {tags.map((tag) => (
            <Tag key={tag} tagName={tag} selected />
          ))}
        </div>
        <div className='task_delete' onClick={onDelete}>
          <img src={deleteIcon} className='delete_icon' alt='delete icon' />
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
