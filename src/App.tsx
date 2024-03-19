import React from 'react';
import DynamicGrid from './components/DynamicGrid';
import { TaskForm } from './components/TaskForm';

const App: React.FC = () => {
  return (
    <div>
      <DynamicGrid rows={8} columns={8} />
      <TaskForm />
    </div>
  );
};

export default App;
