export type GameStatus = "menu" | "playing" | "pause" | "gameover";

export type ScreenParams = {
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
};

export enum MAP_ELEMENTS {
  EMPTY = 0,
  SNAKE_BODY = 1,
  SNAKE_HEAD = 2,
  FRUIT = 3,
}

export enum DIRECTIONS {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

// The initial size of the snake
export const DEFAULT_SNAKE_SIZE = 3;

// The size of the board
export const BOARD_SIZE = 50;

// The initial position of the snake
export const INITIAL_SNAKE_POSITION = BOARD_SIZE / 2;

// We create a default board with the snake in the middle
export function createDefaultBoard() {
  const emptyRow = new Array(BOARD_SIZE).fill(MAP_ELEMENTS.EMPTY) as number[];
  const board = new Array(BOARD_SIZE).fill(emptyRow) as number[][];

  return board.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      if (rowIndex === INITIAL_SNAKE_POSITION) {
        // We put the snake head in the middle of the board
        if (cellIndex === INITIAL_SNAKE_POSITION) {
          return MAP_ELEMENTS.SNAKE_HEAD;
        }

        // We put the snake body in the middle of the board - 1, - 2, ...
        if (
          cellIndex > INITIAL_SNAKE_POSITION - DEFAULT_SNAKE_SIZE &&
          cellIndex < INITIAL_SNAKE_POSITION
        ) {
          return MAP_ELEMENTS.SNAKE_BODY;
        }
      }

      return cell;
    });
  });
}
