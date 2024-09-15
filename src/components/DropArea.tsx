import { useState } from 'react';
import './DropArea.css';
import { useTask } from '../context/TaskContext';
import { TaskStatus } from '../type';
type Props = {
  onDrop: () => void;
  colIdx?: number;
  arrIdx: number;
  status: TaskStatus;
};

function DropArea({ colIdx, arrIdx, onDrop, status }: Props) {
  const { activeCard } = useTask();
  const [showDrop, setShowDrop] = useState(false);

  function handleDragEnter() {
    if (!activeCard) return;

    if (
      (activeCard.colIdx &&
        colIdx !== activeCard.colIdx &&
        colIdx !== activeCard.colIdx + 1) ||
      activeCard.status !== status
    ) {
      setShowDrop(true);
      console.log({ activeCard, colIdx, arrIdx, status });
    }
  }
  function handleDrop() {
    // setShowDrop(true);
    console.log(activeCard);
    if (showDrop) {
      console.log({ activeCard, colIdx, arrIdx, status });
      onDrop();
      setShowDrop(false);
    }
  }
  return (
    <section
      onDragEnter={() => handleDragEnter()}
      onDragLeave={() => {
        setShowDrop(false);
      }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={
        showDrop ? 'drop_area' : activeCard ? 'hide_drop' : 'close_drop'
      }
    >
      Drop Here {colIdx && colIdx - 1}
    </section>
  );
}
export default DropArea;
