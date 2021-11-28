import { Module } from "../core/module";
import { random } from "../utils";

export class GuessNumber extends Module {
  constructor(type, text) {
    super(type, text);
    this.container = document.querySelector(".module-container");
  }

  render() {
    if (document.querySelector("guess-container")) {
      remove(document.querySelector("guess-container"));
    }
    const guessContainer = document.createElement("div");
    guessContainer.className = "guess-container";
    const guessHeader = document.createElement("h1");
    guessHeader.className = "guess-header";
    guessHeader.innerHTML = "Угадай число от 1 до 10";
    const guessOutput = document.createElement("ul");
    guessOutput.className = "output";
    const guessInput = document.createElement("input");
    const guessForm = document.createElement("form");
    guessForm.className = "prompt";

    guessForm.append(guessInput);
    guessContainer.append(guessHeader, guessOutput, guessForm);
    this.container.append(guessContainer);
  }

  trigger() {
    this.render();
    this.guessGame();
  }

  guessGame() {
    let number = random(0, 10);
    let guesses = 0;

    const output = document.querySelector(".output");
    const prompt = document.querySelector(".prompt");
    const input = document.querySelector(".prompt input");

    prompt.addEventListener("submit", handleSubmit);

    input.focus();

    function handleSubmit(event) {
      event.preventDefault();

      processInput(input.value);

      input.value = "";
    }

    function printMessage(message) {
      let li = document.createElement("li");

      li.textContent = message;

      output.appendChild(li);
    }

    function clearOutput() {
      for (let i = 0; i < output.children.length; i++) {
        output.removeChild(output.children[i]);
      }
    }

    function processInput(input) {
      if (!input) return;

      clearOutput();
      printMessage(
        `Загадано число от 0 до 10. Попробуй отгадать его за наименьшее количество попыток. После каждой попытки я скажу "мало", "много" или "верно".`
      );

      printMessage(input);

      let guess = Number.parseInt(input);

      if (Number.isNaN(guess)) return;

      guesses += 1;

      if (guess > number) {
        printMessage("Много. Попробуй еще раз.");
      } else if (guess < number) {
        printMessage("Мало. Попробуй еще раз.");
      } else {
        printMessage(`Верно, это число ${guess}.`);
        printMessage(`Количество попыток: ${guesses}.`);
        printMessage("GAME OVER");

        prompt.remove();
      }
    }
  }
}
