import "./styles.css";
import { ContextMenu } from "./menu";
import { BackgroundModule } from "./modules/background.module";
import { GameOfLife } from "./modules/gol";
import { RandomSound } from "./modules/randomSound.module";
import { GuessNumber } from "./modules/guessNumber.module";
import { MemoryGame } from "./modules/memoryGame.module";

// Инициализируем ContextMenu
const contextMenu = new ContextMenu("#menu");

// добавляем слушатели для вызова контекстного меню и его закрытия
document.body.addEventListener("contextmenu", (event) => {
  contextMenu.open(event);
});

document.body.addEventListener("click", (event) => {
  contextMenu.close(event);
});

// создаем инстансы модулей
const gameOfLife = new GameOfLife("Game of Life", "Жизнь бактерий");
const bgModule = new BackgroundModule(
  "Background",
  "Generate random background"
);
const randomSound = new RandomSound("Sounds", "Случайные звуки");
const guessNumber = new GuessNumber("numbers", "Отгадай число");
const memoryGame = new MemoryGame("Memory", "Игра на память");

// добавляем модуль в контекстное меню
contextMenu.add(gameOfLife);
contextMenu.add(bgModule);
contextMenu.add(randomSound);
contextMenu.add(guessNumber);
contextMenu.add(memoryGame);
