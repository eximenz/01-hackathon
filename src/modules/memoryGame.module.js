import { Module } from "../core/module";
import { random } from "../utils";
import angular from "../img/angular.png";
import mongo from "../img/mongo.png";
import node from "../img/node.png";
import react from "../img/react.png";
import school from "../img/school.png";
import vladilen from "../img/vladilen.png";
import webpack from "../img/webpack.png";

export class MemoryGame extends Module {
  constructor(type, text) {
    super(type, text);
    this.container = document.querySelector(".module-container");
  }

  render() {
    if (document.querySelector("memory-game")) {
      remove(document.querySelector("memory-game"));
    }
    const memoryContainer = document.createElement("section");
    memoryContainer.className = "memory-game";
    const memoryHeader = document.createElement("h1");
    memoryHeader.className = "memory-header";
    memoryHeader.innerHTML = "Найди одинаковые пары картинок";
    this.container.append(memoryHeader);

    const arrayOfCards = [
      {
        name: "angular",
        front: angular,
        back: school,
      },
      { name: "mongo", front: mongo, back: school },
      { name: "node", front: node, back: school },
      { name: "react", front: react, back: school },
      {
        name: "vladilen",
        front: vladilen,
        back: school,
      },
      {
        name: "webpack",
        front: webpack,
        back: school,
      },
    ];

    for (let card of arrayOfCards) {
      const memoryCard1 = document.createElement("div");
      memoryCard1.className = "memory-card";
      memoryCard1.dataset.framework = card.name;
      const cardFront = document.createElement("img");
      cardFront.className = "front-face";
      cardFront.src = card.front;
      const cardBack = document.createElement("img");
      cardBack.className = "back-face";
      cardBack.src = card.back;
      memoryCard1.append(cardFront, cardBack);
      const memoryCard2 = document.createElement("div");
      memoryCard2.className = "memory-card";
      memoryCard2.dataset.framework = card.name;
      const cardFrontPair = document.createElement("img");
      cardFrontPair.className = "front-face";
      cardFrontPair.src = card.front;
      const cardBackPair = document.createElement("img");
      cardBackPair.className = "back-face";
      cardBackPair.src = card.back;
      memoryCard2.append(cardFrontPair, cardBackPair);
      memoryContainer.append(memoryCard1, memoryCard2);
      // this.container.append(memoryContainer);
    }
    this.container.append(memoryContainer);
  }

  trigger() {
    this.render();
    this.memoryGame();
  }

  memoryGame() {
    const cards = document.querySelectorAll(".memory-card");

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add("flip");

      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
      }

      secondCard = this;
      checkForMatch();
    }

    function checkForMatch() {
      let isMatch =
        firstCard.dataset.framework === secondCard.dataset.framework;

      isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);

      resetBoard();
    }

    function unflipCards() {
      lockBoard = true;

      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
      }, 1500);
    }

    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }

    (function shuffle() {
      cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
      });
    })();

    cards.forEach((card) => card.addEventListener("click", flipCard));
  }
}
