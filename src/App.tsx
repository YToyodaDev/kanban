import './App.css';
import TaskColumn from './components/TaskColumn';
import TaskForm from './components/TaskForm';
import TodoIcon from './assets/direct-hit.png';
import DoneIcon from './assets/check-mark-button.png';
import DoingIcon from './assets/glowing-star.png';
import { TaskStatus } from './type';

function App() {
  return (
    <div className='app'>
      <TaskForm />
      <main className='app_main'>
        <TaskColumn title='To do' icon={TodoIcon} status={TaskStatus.Todo} />
        <TaskColumn title='Doing' icon={DoingIcon} status={TaskStatus.Doing} />
        <TaskColumn title='Done' icon={DoneIcon} status={TaskStatus.Done} />
      </main>
    </div>
  );
}

export default App;
