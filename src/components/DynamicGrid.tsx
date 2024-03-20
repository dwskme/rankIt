import { useEffect, useState } from 'react';
import "./DynamicGrid.css"

interface DynamicGridProps {
  tasks: string[];
}

const DynamicGrid: React.FC<DynamicGridProps> = ({ tasks }) => {
  const [gridStyles, setGridStyles] = useState('');
  const [gridItems, setGridItems] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const columns = tasks.length;
    const rows = tasks.length;
    const gridTemplateColumns = `repeat(${columns}, 1fr)`;
    const gridTemplateRows = `repeat(${rows}, 1fr)`;

    let styles = `.parent {
      display: inline-grid;
      grid-template-columns: ${gridTemplateColumns};
      grid-template-rows: ${gridTemplateRows};
      grid-column-gap: 0px;
      grid-row-gap: 0px;
    }`;

    let divCount = 1;
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= columns; j++) {
        if (divCount <= rows * columns) {
          styles += `.div${divCount} { grid-area: ${i} / ${j} / ${i + 1} / ${j + 1}; }`;
          divCount++;
        }
      }
    }

    setGridStyles(styles);

    const items: React.ReactNode[] = [];
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= i; j++) {
        let content = `Row ${i}: Col ${j}`;
        if (i === j) {
          content = tasks[i - 1];
        }
        if (i === rows) {
          content = tasks[j - 1];
        }
        if (i === j && i === rows) {
          content = "Play"
        }
        items.push(
          <div
            key={`${i}-${j}`}
            className={`div${(i - 1) * columns + j} square-block`}
          >
            {content}
          </div>
        );
      }
    }

    setGridItems(items);
  }, [tasks]);

  return (
    <div>
      <style>{gridStyles}</style>
      <div className="parent">{gridItems}</div>
    </div>
  );
};

export default DynamicGrid;
