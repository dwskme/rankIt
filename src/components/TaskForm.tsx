import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import RankTask from './RankTask';

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
      if (task.length >= 4 && task.length <= 12) {
        onSubmit({ Task: task });
        e.currentTarget.value = '';
      } else if (task.length < 4) {
        alert('Task must be at least 4 characters long');
      } else {
        alert('Task cannot be more than 12 characters');
      }
      e.preventDefault();
    }
  };

  const [isRanking, setIsRanking] = useState(false);
  const [indexI, setCurrentIndexI] = useState(0);
  const [indexJ, setCurrentIndexJ] = useState(0);
  const [_ranks, setRanks] = useState<{ [key: string]: number }>({});

  const onSubmitRankHandler = () => {
    setIsRanking(true);
    setRanks(tasks.reduce((acc, task) => ({ ...acc, [task]: 0 }), {}));
    for (let i = 1; i <= tasks.length; i++) {
      for (let j = 1; j <= i; j++) {
        if (i === j) {
          continue
        }
        setCurrentIndexI(j - 1)
        setCurrentIndexJ(i - 1)
        console.log("setcurretntindex:", "i", j - 1, "j", i - 1)
      }
    }
  }

  const handleOptionSelect = (option: string) => {
    setRanks((prevRanks) => ({
      ...prevRanks,
      [option]: (prevRanks[option] || 0) + 1,
    }));
  };

  const finishRanking = () => {
    setIsRanking(false);
  };
  return (
    <>
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
            maxLength: 12,
          })}
          onKeyDown={handleKeyDown}
        />
        {/* FIXME: Proper error handling */}
        {errors.Task && errors.Task.type === 'required' && (
          <span>This field is required</span>
        )}
      </form>
      <button type='submit' onClick={onSubmitRankHandler}>
        Play
      </button>
      {isRanking && (
        <RankTask
          tasks={tasks}
          indexI={indexI}
          indexJ={indexJ}
          onOptionSelect={handleOptionSelect}
          onFinish={finishRanking}
        />
      )}
    </>
  );
};


export default TaskForm;
