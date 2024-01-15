import React from "react";
import { Sheet } from "../App";

interface BlockListProps {
  sheet: Sheet;
  sheetSize: { width: number; height: number };
}

const BlockList: React.FC<BlockListProps> = ({ sheet, sheetSize }) => {
  const renderBlocks = () => {
    let currentRow = 0;
    let currentCol = 0;
    let maxHeightInCurrentRow = 0;

    return sheet.blocks.map((block, blockIndex) => {
      const blockElements: JSX.Element[] = [];

      for (let i = 0; i < block.count; i++) {
        if (
          currentCol + block.width > sheetSize.width ||
          currentRow + block.height > sheetSize.height
        ) {
          // Переходимо до нового ряду, якщо блок не влазить в поточний
          currentRow += maxHeightInCurrentRow;
          currentCol = 0;
          maxHeightInCurrentRow = 0;
        }

        const left = currentCol;
        const top = currentRow;

        blockElements.push(
          <li
            key={`${blockIndex}-${i}`}
            style={{
              position: "absolute",
              left: `${left}em`,
              top: `${top}em`,
              width: `${block.width}em`,
              height: `${block.height}em`,
              background: "violet",
              border: "1px black solid",
            }}
          >
            {`${block.width}x${block.height}`}
          </li>
        );

        currentCol += block.width;
        maxHeightInCurrentRow = Math.max(maxHeightInCurrentRow, block.height);
      }

      return blockElements;
    });
  };

  return (
    <ul
      style={{
        position: "relative",
        width: `${sheetSize.width}em`,
        height: `${sheetSize.height}em`,
        border: "1px black solid",
        listStyle: "none",
        padding: "0",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {renderBlocks()}
    </ul>
  );
};

export default BlockList;
