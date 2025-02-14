"use strict";
// Password can be easy to read or easy say
// or just random set of characters
// password should include at least :
// 1 capital case letter
// 1 special character
// and should have length at least 12 characters
const upperCase = (new Array(25).fill("")).map((c, i) => {
  return String.fromCharCode(65 + i);
});
const lowerCase = (new Array(25).fill("")).map((c, i) => {
  return String.fromCharCode(97 + i);
});
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = [
  "!", "#", "$", "&",
  "+", "*", "-", "_",
  "(", ")", "{", "}",
  "~", "\\", "^", "@"];

function generatePassword(length, params = {}) {
  // inititally, create a list of symbols that can be used for
  // password generating.
  let result = "";
  let characters = [];
  console.log(params);

  if (params.numbers)
    characters = [...characters, ...numbers];

  if (params.symbols)
    characters = [...characters, ...symbols];

  if (params.upperCase)
    characters = [...characters, ...upperCase];

  if (params.lowerCase)
    characters = [...characters, ...lowerCase];

  console.log(characters);

  do {
    const index = Math.floor(Math.random() * characters.length);

    result += characters[index];
  } while (result.length < length);

  return result.slice(0, length);
}

function handleSwitchType(type, form) {
  if (type === "easy-to-read") {
    form["use-lowercase"].checked = "checked";
    form["use-uppercase"].checked = "checked";
    form["use-numbers"].disabled = "";
    form["use-symbols"].disabled = "";
  } else if(type === "easy-to-say") {
    form["use-numbers"].disabled = "disabled";
    form["use-symbols"].disabled = "disabled";
    form["use-numbers"].checked = "";
    form["use-symbols"].checked = "";
    form["use-lowercase"].checked = "checked";
    form["use-uppercase"].checked = "checked";
  } else {
    form["use-numbers"].disabled = "";
    form["use-symbols"].disabled = "";
    form["use-numbers"].checked = "checked";
    form["use-symbols"].checked = "checked";
    form["use-lowercase"].checked = "checked";
    form["use-uppercase"].checked = "checked";
  }
}

(async () => {
  const form = document.getElementById("password-generator");
  const copyButton = document.getElementById("copy-password-btn");
  const generateButton = document.getElementById("generate-password-btn");
  const useUppercase = form["use-uppercase"];
  const useLowercase = form["use-lowercase"];
  const useNumbers = form["use-numbers"];
  const useSymbols = form["use-symbols"];

  handleSwitchType("all-characters", form);

  form.length.value = form["length-range"].value;

  const length = form.length.value;
  form.password.value = generatePassword(length, {
    upperCase: useUppercase.checked,
    lowerCase: useLowercase.checked,
    numbers: useNumbers.checked,
    symbols: useSymbols.checked
  });

  copyButton.addEventListener("click", ev => {
    ev.preventDefault();
    window.navigator.clipboard.writeText(form.password.value);
  });

  generateButton.addEventListener("click", ev => {
    ev.preventDefault();
    const length = form.length.value;

    form.password.value = generatePassword(length,  {
      upperCase: useUppercase.checked,
      lowerCase: useLowercase.checked,
      numbers: useNumbers.checked,
      symbols: useSymbols.checked
    });
  });

  form.addEventListener("submit", ev => {
    ev.preventDefault();

    window.navigator.clipboard.writeText(form.password.value);
  });

  form.addEventListener("change", ev => {
    if (ev.target.type === "range")
      form.length.value = form["length-range"].value;
    else if (ev.target.type === "number")
      form["length-range"].value = form.length.value;

    if ([
      "easy-to-say",
      "easy-to-read",
      "all-characters"
    ].includes(ev.target.value)) {
      handleSwitchType(ev.target.value, form);
    }

    if ([
      "use-uppercase",
      "use-lowercase",
      "use-numbers",
      "use-symbols"
    ].includes(ev.target.name)) {
      const sum = [
        useUppercase,
        useLowercase,
        useNumbers,
        useSymbols
      ].reduce((akk, v) => akk + v.checked, 0);
      if (sum === 0) {
        ev.target.checked = "checked";
        return;
      }
    }

    const length = form.length.value;

    form.password.value = generatePassword(length, {
      upperCase: useUppercase.checked,
      lowerCase: useLowercase.checked,
      numbers: useNumbers.checked,
      symbols: useSymbols.checked
    });
  });
})();
