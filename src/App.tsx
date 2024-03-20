import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import DynamicGrid from './components/DynamicGrid';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const handleAddTask = (task: string) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleRemoveTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <div className="grid-container">
        {tasks.length >= 2 && <DynamicGrid tasks={tasks} />}
      </div>
      <div className="task-list-container">
        {tasks.length <= 7 &&
          <TaskForm onAddTask={handleAddTask} onRemoveTask={handleRemoveTask} tasks={tasks} />
        }
      </div>
    </div>
  );
};

export default App;
