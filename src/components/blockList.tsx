import React from "react";
import { Sheet } from "../App";

interface BlockListProps {
  sheet: Sheet;
}

const BlockList: React.FC<BlockListProps> = ({ sheet }) => {
  return (
    <div>
      {sheet.blocks.map((block, blockIndex) => (
        <div
          key={blockIndex}
          style={{
            width: `${block.width}em`,
            height: `${block.height}em`,
            background: "violet",
            border: "1px black solid",
          }}
        >
          {`${block.width}x${block.height}, Кількість: ${block.count}`}
        </div>
      ))}
    </div>
  );
};

export default BlockList;