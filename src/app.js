import "./styles.css";
import { ContextMenu } from "./menu";
import { BackgroundModule } from "./modules/background.module";
import { GameOfLife } from "./modules/gol.module";
import { RandomSound } from "./modules/randomSound.module";
import { GuessNumber } from "./modules/guessNumber.module";
import { MemoryGame } from "./modules/memoryGame.module";
import { ImgModule } from "./modules/img.module";

const contextMenu = new ContextMenu("#menu");

document.body.addEventListener("contextmenu", (event) => {
  contextMenu.open(event);
});

document.body.addEventListener("click", (event) => {
  contextMenu.close(event);
});

const gameOfLife = new GameOfLife("Game of Life", "Окрестности Мура");
const bgModule = new BackgroundModule("Background", "Случайная смена фона");
const randomSound = new RandomSound("Sounds", "Случайные звуки");
const guessNumber = new GuessNumber("numbers", "Отгадай число");
const memoryGame = new MemoryGame("Memory", "Игра на память");
const imgModule = new ImgModule("imgModule", "Получи дозу радости");


contextMenu.add(bgModule);
contextMenu.add(randomSound);
contextMenu.add(guessNumber);
contextMenu.add(memoryGame);
contextMenu.add(imgModule);
contextMenu.add(gameOfLife);