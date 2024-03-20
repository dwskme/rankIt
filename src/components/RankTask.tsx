import React, { useState, useEffect } from 'react';
import './RankTask.css';

interface RankTaskProps {
  tasks: string[];
  indexI: number;
  indexJ: number;
  onOptionSelect: (option: string) => void;
  onFinish: () => void;
}

const RankTask: React.FC<RankTaskProps> = ({ tasks, indexI, indexJ, onOptionSelect, onFinish, }) => {

  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  useEffect(() => {
    setQuestion1(tasks[indexI]);
    setQuestion2(tasks[indexJ]);
  }, [tasks, indexI, indexJ]);

  const handleOptionClick = (option: string, indexI: number, indexJ: number) => {
    updateGrid(indexI, indexJ)
    console.log("indexI,IndexJ", indexI, indexJ)
    onOptionSelect(option);
  };

  const renderResult = () => {
    if (indexI >= tasks.length - 1) {
      onFinish();
      return (
        <div className='result-container'>
          <h2>Ranking Completed</h2>
          {/* Add your result rendering logic here */}
        </div>
      );
    }
  };
  const updateGrid = (indexI: number, indexJ: number) => {
    const index = (indexI - 1) * tasks.length + indexJ
    const elementsWithClass: HTMLCollectionOf<Element> = document.getElementsByClassName('div' + index);
    console.log("and:", 'div' + index)
    if (elementsWithClass.length > 0) {
      const changePropertiesButton: HTMLElement = elementsWithClass[0] as HTMLElement;
      changePropertiesButton.style.backgroundColor = 'blue';
    }
  }

  return (
    <div className='rank-task-container'>
      {renderResult() || (
        <>
          <div className='option-card'>
            <h3>{question1}</h3>
            <button onClick={() => handleOptionClick(question1, indexI, indexJ)}>Rank Higher</button>
          </div>
          <div className='option-card'>
            <h3>{question2}</h3>
            <button onClick={() => handleOptionClick(question2, indexI, indexJ)}>Rank Higher</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RankTask;
