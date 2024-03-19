import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  Task: string;
};

export function TaskForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      Task: "",
    },
  });

  const [tasks, setTasks] = useState<string[]>([]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setTasks((prevTasks) => [...prevTasks, data.Task]);
    setValue("Task", "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const task = e.currentTarget.value.trim();
      if (task) {
        onSubmit({ Task: task });
        e.currentTarget.value = "";
      }
      e.preventDefault();
    }
  };

  const removeTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <span onClick={() => removeTask(index)} style={{ cursor: "pointer" }}>
                &#10005;
              </span>
            </li>
          ))}
        </ul>
        <input
          {...register("Task", {
            required: true,
            max: 80,
            min: 4,
            maxLength: 80,
          })}
          onKeyDown={handleKeyDown}
        />
        {errors.Task && errors.Task.type === "required" && (
          <span>This field is required</span>
        )}
        {errors.Task && errors.Task.type === "min" && (
          <span>Task must be at least 4 characters long</span>
        )}
        {errors.Task && errors.Task.type === "max" && (
          <span>Task cannot be longer than 80 characters</span>
        )}
        <input type="submit" />
      </form>
    </>
  );
}
