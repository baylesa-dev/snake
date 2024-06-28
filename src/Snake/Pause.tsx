import { ScreenParams } from "./consts";

export function Pause({ setGameStatus }: ScreenParams) {
  return (
    <div className="h-[90vh] w-[90vw] items-center justify-center flex absolute -top-[5vh] -left-[5vh] z-10 bg-gray-800/50 backdrop-blur-sm">
      <div className="flex items-stretch justify-center flex-col gap-2">
        <button
          className="h-10 px-6 bg-emerald-600 text-white rounded-md text-lg font-semibold"
          onClick={() => setGameStatus("playing")}
        >
          Resume
        </button>
        <button
          className="h-10 px-6 bg-white border border-emerald-500 text-emerald-500 rounded-md font-semibold "
          onClick={() => setGameStatus("menu")}
        >
          Menu
        </button>
      </div>
    </div>
  );
}
