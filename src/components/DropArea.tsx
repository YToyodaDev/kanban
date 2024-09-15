import { useState } from 'react';
import './DropArea.css';
import { useTask } from '../context/TaskContext';
type Props = {
  onDrop: () => void;
  index?: number;
};

function DropArea({ index, onDrop }: Props) {
  const { activeCard } = useTask();
  const [showDrop, setShowDrop] = useState(false);

  function handleDragEnter() {
    if (activeCard && index !== activeCard && index !== activeCard - 1) {
      setShowDrop(true);
      console.log({ activeCard, index });
    }
  }

  return (
    <section
      onDragEnter={() => handleDragEnter()}
      onDragLeave={() => {
        setShowDrop(false);
      }}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={showDrop ? 'drop_area' : 'hide_drop'}
    >
      Drop Here
    </section>
  );
}
export default DropArea;
