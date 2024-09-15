import Tag from './Tag';
import './TaskCard.css';
import deleteIcon from '../assets/delete.png';
import { useTask } from '../context/TaskContext';

interface Props {
  title: string;
  tags: string[];
  index: number;
}

function TaskCard({ index, title, tags }: Props) {
  const { setActiveCard, handleDelete } = useTask();
  const onDelete = handleDelete.bind(null, index);
  return (
    <article
      className='task_card'
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <p className='task_text'>
        {title}
        {index}
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
