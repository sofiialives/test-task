import React from "react";
import BlockList from "./components/blockList";

interface Block {
  width: number;
  height: number;
  count: number;
}

export interface Sheet {
  blocks: Block[];
  remainingArea: number;
}

const App: React.FC = () => {
  const sheetSize = { width: 20, height: 40 };
  const blockSizes: Block[] = [
    { width: 5, height: 7, count: 50 },
    { width: 3, height: 4.5, count: 70 },
    { width: 9, height: 2, count: 50 },
  ];

  const minSheets = (): Sheet[] => {
    let sheets: Sheet[] = [];
    let copyBlocks: Block[] = [...blockSizes];

    while (copyBlocks.some((block) => block.count > 0)) {
      const currentSheet: Sheet = {
        blocks: [],
        remainingArea: sheetSize.width * sheetSize.height,
      };

      for (let i = 0; i < copyBlocks.length; i++) {
        const block = copyBlocks[i];

        if (block.width > sheetSize.width || block.height > sheetSize.height) {
          // Блок не може бути розміщений, переходимо до наступного
          continue;
        }

        const maxCols = Math.floor(
          currentSheet.remainingArea / (block.width * sheetSize.height)
        );
        const maxRows = Math.floor(sheetSize.height / block.height);
        const minCount = Math.min(maxCols * maxRows, block.count);

        currentSheet.blocks.push({ ...block, count: minCount });
        currentSheet.remainingArea -= minCount * block.width * block.height;

        copyBlocks[i].count -= minCount;

        if (copyBlocks[i].count === 0) {
          copyBlocks.splice(i, 1);
          i--;
        }
      }

      if (currentSheet.blocks.length > 0) {
        sheets.push(currentSheet);
      } else {
        break;
      }
    }

    return sheets;
  };

  const sheets: Sheet[] = minSheets();

  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        Мінімальна кількість аркушів: {sheets.length}
      </h1>
      <ul style={{ display: "flex", gap: "64px" }}>
        {sheets.map((sheet, index) => (
          <li key={index} className="sheet">
            <h2>Аркуш {index + 1}</h2>
            <div
              style={{
                width: `${sheetSize.width}em`,
                height: `${sheetSize.height}em`,
                border: "1px black solid",
              }}
            >
              <BlockList sheet={sheet} sheetSize={sheetSize} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
