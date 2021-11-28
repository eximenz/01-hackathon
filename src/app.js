import "./styles.css";
import { ContextMenu } from "./menu";
import { BackgroundModule } from "./modules/background.module";
import { GameOfLife } from "./modules/gol";
import { RandomSound } from "./modules/randomSound.module";
import { GuessNumber } from "./modules/guessNumber.module";

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
const gameOfLife = new GameOfLife("Game of Life", "Let's watch and relax!");
const bgModule = new BackgroundModule(
  "Background",
  "Generate random background"
);
const randomSound = new RandomSound("Sounds", "Random Sounds");
const guessNumber = new GuessNumber("numbers", "Отгадай число");

// добавляем модуль в контекстное меню
contextMenu.add(gameOfLife);
contextMenu.add(bgModule);
contextMenu.add(randomSound);
contextMenu.add(guessNumber);
