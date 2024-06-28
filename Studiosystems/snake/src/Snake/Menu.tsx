import { ScreenParams } from "./consts";

export function Menu({ setGameStatus }: ScreenParams) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <button
        className="h-10 px-6 bg-emerald-600 text-white uppercase rounded-md text-lg font-semibold"
        onClick={() => setGameStatus("playing")}
      >
        Jouer
      </button>
    </div>
  );
}
