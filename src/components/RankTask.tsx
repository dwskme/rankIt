import React, { useState, useEffect } from 'react';
import './RankTask.css';
import ResultTable from './ResultTable';

interface RankTaskProps {
  tasks: string[];
  onOptionSelect: (option: string, indexI: number, indexJ: number) => void;
  onFinish: (ranks: { [key: string]: number }) => void;
  ranks: { [key: string]: number };
}

const RankTask: React.FC<RankTaskProps> = ({ tasks, onOptionSelect, onFinish, ranks }) => {
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [indexI, setIndexI] = useState(0);
  const [indexJ, setIndexJ] = useState(1);
  const [isRankingCompleted, setIsRankingCompleted] = useState(false);

  useEffect(() => {
    setQuestion1(tasks[indexI]);
    setQuestion2(tasks[indexJ]);
  }, [tasks, indexI, indexJ]);

  const handleOptionClick = (option: string) => {
    onOptionSelect(option, indexI, indexJ);
    updateIndices();
  };

  const updateIndices = () => {
    if (indexJ === tasks.length - 1) {
      setIndexI(indexI + 1);
      setIndexJ(indexI + 2);
    } else {
      setIndexJ(indexJ + 1);
    }

    if (indexI === tasks.length - 1 && indexJ === tasks.length) {
      setIsRankingCompleted(true);
      onFinish(ranks);
    }
  };

  return (
    <div className="rank-task-container">
      {isRankingCompleted ? (
        <ResultTable ranks={ranks} />
      ) : (
        <>
          <div className="option-card">
            <h3>{question1}</h3>
            <button onClick={() => handleOptionClick(question1)}>Rank Higher</button>
          </div>
          <div className="option-card">
            <h3>{question2}</h3>
            <button onClick={() => handleOptionClick(question2)}>Rank Higher</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RankTask;
