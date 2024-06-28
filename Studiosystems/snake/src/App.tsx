import { useState } from "react";
import { GameStatus } from "./Snake/consts";
import { Menu } from "./Snake/Menu";
import { Playing } from "./Snake/Playing";
import { Gameover } from "./Snake/GameOver";
import { Pause } from "./Snake/Pause";

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>("menu");

  return (
    <div className="h-screen w-screen bg-emerald-700 flex items-center justify-center">
      <section className="h-[80vh] w-[80vw] m-auto bg-white shadow-xl shadow-emerald-800 rounded-md relative overflow-hidden">
        {gameStatus === "menu" && <Menu setGameStatus={setGameStatus} />}
        {(gameStatus === "playing" || gameStatus === "pause") && (
          <Playing gameStatus={gameStatus} setGameStatus={setGameStatus} />
        )}
        {gameStatus === "pause" && <Pause setGameStatus={setGameStatus} />}
        {gameStatus === "gameover" && (
          <Gameover setGameStatus={setGameStatus} />
        )}
      </section>
    </div>
  );
}

export default App;
