import Tag from './Tag';
import './TaskCard.css';
import deleteIcon from '../assets/delete.png';

interface Props {
  title: string;
  tags: string[];
  onDelete: () => void;
  index: number;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
}

function TaskCard({ index, title, tags, onDelete, setActiveCard }: Props) {
  return (
    <article
      className='task_card'
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <p className='task_text'>{title}</p>
      <div className='task_card_bottom_line '>
        <div className='task_card_tags'>
          {tags.map((tag) => (
            <Tag tagName={tag} selected />
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
