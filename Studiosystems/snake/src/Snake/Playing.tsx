import { useState, useEffect } from "react";
import { cn } from "../utils/cn";
import {
  createDefaultBoard,
  DEFAULT_SNAKE_SIZE,
  DIRECTIONS,
  GameStatus,
  MAP_ELEMENTS,
  ScreenParams,
} from "./consts";

type PlayParams = {
  gameStatus: GameStatus;
};

export function Playing({
  gameStatus,
  setGameStatus,
}: ScreenParams & PlayParams) {
  const [snakeSize, setSnakeSize] = useState<number>(DEFAULT_SNAKE_SIZE);
  const [board, setBoard] = useState<number[][]>(createDefaultBoard());
  const [direction, setDirection] = useState<DIRECTIONS>(DIRECTIONS.RIGHT);

  function moveSnake() {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.map((cell) => cell));

      let snakeHeadPosition = { x: 0, y: 0 };
      newBoard.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (cell === MAP_ELEMENTS.SNAKE_HEAD) {
            snakeHeadPosition = { x: rowIndex, y: cellIndex };
          }
        });
      });

      let newSnakeHeadPosition = {
        x: snakeHeadPosition.x,
        y: snakeHeadPosition.y,
      };

      switch (direction) {
        case DIRECTIONS.UP:
          newSnakeHeadPosition.x -= 1;
          break;
        case DIRECTIONS.DOWN:
          newSnakeHeadPosition.x += 1;
          break;
        case DIRECTIONS.LEFT:
          newSnakeHeadPosition.y -= 1;
          break;
        case DIRECTIONS.RIGHT:
          newSnakeHeadPosition.y += 1;
          break;
        default:
          break;
      }

      newBoard[newSnakeHeadPosition.x][newSnakeHeadPosition.y] =
        MAP_ELEMENTS.SNAKE_HEAD;

      return newBoard;
    });
  }

  useEffect(() => {
    if (gameStatus === "playing") {
      // We move the snake every second if the gameStatus is "playing"
      const interval = setInterval(moveSnake, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStatus]);

  useEffect(() => {
    // We listen the keyboard to change the direction of the snake
    const keyListener = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          setDirection(DIRECTIONS.UP);
          break;
        case "ArrowDown":
          setDirection(DIRECTIONS.DOWN);
          break;
        case "ArrowLeft":
          setDirection(DIRECTIONS.LEFT);
          break;
        case "ArrowRight":
          setDirection(DIRECTIONS.RIGHT);
          break;
        default:
          break;
      }
    };

    // We add the event listener when the component is mounted
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, []);

  return (
    <>
      <div className="h-full w-full relative flex flex-wrap">
        <button
          className="h-8 px-6 bg-white border border-emerald-500 text-emerald-500 rounded-md font-semibold absolute top-2 right-2"
          onClick={() => setGameStatus("pause")}
        >
          Pause
        </button>

        {board.map((row, index) =>
          row.map((cell, rowIndex) => (
            <div
              key={`${index}-${rowIndex}`}
              className={cn(
                "flex items-center justify-center border border-gray-100 w-[calc(100%/50)] h-[calc(100%/50)]",
                {
                  "bg-white": cell === MAP_ELEMENTS.EMPTY,
                  "bg-emerald-600": cell === MAP_ELEMENTS.SNAKE_BODY,
                  "bg-emerald-700": cell === MAP_ELEMENTS.SNAKE_HEAD,
                },
              )}
            >
              {cell === MAP_ELEMENTS.FRUIT && (
                <span className="text-xs">🍎</span>
              )}
              {cell === MAP_ELEMENTS.SNAKE_HEAD && (
                <span className="text-xs">👀</span>
              )}
            </div>
          )),
        )}
      </div>

      <div className="fixed top-2 right-2 text-4xl">
        {direction === DIRECTIONS.UP && <div>⬆️</div>}
        {direction === DIRECTIONS.DOWN && <div>⬇️</div>}
        {direction === DIRECTIONS.LEFT && <div>⬅️</div>}
        {direction === DIRECTIONS.RIGHT && <div>➡️</div>}
      </div>
    </>
  );
}
