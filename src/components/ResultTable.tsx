import React from 'react';
import './ResultTable.css';

interface ResultTableProps {
  ranks: { [key: string]: number };
}

const ResultTable: React.FC<ResultTableProps> = ({ ranks }) => {
  return (
    <div className="result-container">
      <h2>Ranking Completed</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ranks).map(([task, rank]) => (
            <tr key={task}>
              <td>{task}</td>
              <td>{rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
