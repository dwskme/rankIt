import { useState } from 'react';
import TaskForm from './components/TaskForm';
import DynamicGrid from './components/DynamicGrid';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const handleAddTask = (task: string) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleRemoveTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} onRemoveTask={handleRemoveTask} tasks={tasks} />
      <DynamicGrid tasks={tasks} />
    </div>
  );
};

export default App;
