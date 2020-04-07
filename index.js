var buttons = document.querySelectorAll(".button");
var screen = document.querySelector(".calcdisplay");
var expression = "";
var operators = ["%", "÷", "×", "-", "+", "."];

buttons.forEach((button) => button.addEventListener("click", calculate));
document.addEventListener("keydown", calculate);

function calculate(e) {
  // get input by click or by keyboard
  let input =
    e.toElement || document.querySelector(`.button[data-cont='${e.key}']`);
  if (!input) return;

  // scale button via JS, because css :active only captures transformed clicked area
  input.classList.toggle("clicked");

  if (input.innerText === "=") {
    try {
      // expression = math.evaluate(expression).toString();
      expression = (
        Math.round((math.evaluate(expression) + Number.EPSILON) * 1000) / 1000
      ).toString();
      screen.innerText = expression;
    } finally {
      return;
    }
  }
  if (input.innerText === "C") {
    expression = "";
    screen.innerText = "";
    return;
  }
  if (input.innerText === "⌫") {
    expression = expression.slice(0, -1);
    screen.innerText = screen.innerText.slice(0, -1);
    console.log(expression);
    return;
  }
  if (input.innerText === "( )") {
    return;
  }

  if (input.innerText === "%") {
    expression += "/100*";
    screen.innerText += input.innerText;
    return;
  }

  expression += input.getAttribute("data-cont");
  screen.innerText += input.innerText;
  console.log(expression);
}

// transition back when clicked
buttons.forEach((key) =>
  key.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    e.target.classList.remove("clicked");
  })
);
