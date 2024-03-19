import { useForm, SubmitHandler } from 'react-hook-form';
import React from 'react';

type Inputs = {
  Task: string;
};

interface TaskFormProps {
  onAddTask: (task: string) => void;
  onRemoveTask: (index: number) => void;
  tasks: string[];
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onRemoveTask, tasks }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      Task: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onAddTask(data.Task);
    setValue('Task', '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const task = e.currentTarget.value.trim();
      if (task.length >= 4 && task.length <= 80) {
        onSubmit({ Task: task });
        e.currentTarget.value = '';
      } else if (task.length < 4) {
        alert('Task must be at least 4 characters long');
      } else {
        alert('Task cannot be longer than 80 characters');
      }
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <span onClick={() => onRemoveTask(index)} style={{ cursor: 'pointer' }}>
              &#10005;
            </span>
          </li>
        ))}
      </ul>
      <input
        {...register('Task', {
          required: true,
          minLength: 4,
          maxLength: 80,
        })}
        onKeyDown={handleKeyDown}
      />
      {errors.Task && errors.Task.type === 'required' && (
        <span>This field is required</span>
      )}
    </form>
  );
};

export default TaskForm;
