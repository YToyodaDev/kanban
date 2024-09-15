import { TagStyle } from '../type';
import './Tag.css';

interface Props {
  tagName: string;
  selectTag?: (item: string) => void;
  selected: boolean;
}

function Tag({ tagName, selectTag, selected }: Props) {
  const tagStyle: TagStyle = {
    HTML: { backgroundColor: '#fda821' },
    CSS: { backgroundColor: '#15d4c8' },
    JavaScript: { backgroundColor: '#ffd12c' },
    React: { backgroundColor: '#4cdafc' },
    default: { backgroundColor: '#f9f9f9' },
  };
  return (
    <button
      type='button'
      className='tag'
      style={selected ? tagStyle[tagName] : tagStyle.default}
      onClick={() => selectTag && selectTag(tagName)}
    >
      {tagName}
    </button>
  );
}

export default Tag;
