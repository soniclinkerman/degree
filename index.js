const MINLENGTH = 1;
const MAXLENGTH = 16;

const btn = document.querySelector(".generate_btn");

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn1");
const btn3 = document.getElementById("btn1");
const btn4 = document.getElementById("btn1");
const display = document.querySelector(".display");
const includeFlats = document.getElementById("include_flat");
const generateBtn = document.querySelector(".generate-btn");
const isBlues = document.getElementById("blues-option");

const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const length = document.getElementById("selected_length");

const presetButtons = document.querySelectorAll(".btn-preset");

const targetNumber = document.querySelector(".count");
const scaleDegreeSequence = document.querySelector(".scale-degree-sequence");
const generatedSequence = document.querySelector(".generated-sequence");
let selectedButton = document.querySelector(".btn-preset");
let value = selectedButton.textContent;

let mappingBadge = document.querySelector(".mapping-badge");
length.value = selectedButton.textContent;
const bluesNotes = {
  3: true,
  5: true,
  7: true,
};

const removeActivePreset = () => {
  presetButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
};

increase.addEventListener("click", () => {
  value += 1;
  if (value > MAXLENGTH) {
    value = MAXLENGTH;
  }
  length.value = value;
  removeActivePreset();
});

decrease.addEventListener("click", () => {
  value -= 1;
  if (value < 1) {
    value = MINLENGTH;
  }
  length.value = value;
  removeActivePreset();
});

presetButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    value = Number(btn.textContent);
    length.value = value;
    btn.classList.add("active");
    selectedButton.classList.remove("active");
    selectedButton = btn;
  });
});

function configureSetup(arr) {
  let newArr = [];
  arr.forEach((n) => {
    if (isBlues.checked) {
      if (bluesNotes[n]) {
        newArr.push(`${n}♭`);
      } else {
        newArr.push(n);
      }
    } else {
      newArr.push(n);
    }
  });
  generatedSequence.style.display = "flex";
  targetNumber.textContent = `${value} target notes`;
  scaleDegreeSequence.replaceChildren();
  newArr.forEach((x, idx) => {
    generateTarget(x, idx);
  });

  console.log(newArr);
}

const generateTarget = (value, index) => {
  const newElement = document.createElement("div");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  newElement.classList.add("target");
  newElement.appendChild(h2);
  newElement.appendChild(p);

  h2.textContent = value;
  p.textContent = index;
  scaleDegreeSequence.appendChild(newElement);
  scaleDegreeSequence.style.display = "grid";

  if (isBlues.checked) {
    mappingBadge.style.display = "flex";
  } else {
    mappingBadge.style.display = "none";
  }
};

function isNumberPresent() {}

generateBtn.addEventListener("click", () => {
  let arr = [];
  let x = 0;
  let previousNumber;
  console.log(value);
  while (x < value) {
    let num = Math.floor(Math.random() * 7) + 1;
    if (previousNumber !== num) {
      arr.push(num);
      x += 1;
      previousNumber = num;
    }
  }
  configureSetup(arr);
});

length.addEventListener("change", (e) => {
  removeActivePreset();
  if (Number(e.target.value) < MINLENGTH) {
    value = MINLENGTH;
  } else if (Number(e.target.value) > MAXLENGTH) {
    value = MAXLENGTH;
  }
  length.value = value;
});

// generateBtn.addEventListener("click", () => {
//   let arr = [];
//   let x = 0;
//   let obj = {};
//   while (x < value) {
//     let num = Math.floor(Math.random() * 7) + 1;
//     if (obj[num] === undefined) {
//       arr.push(num);
//       obj[num] = true;
//       x += 1;
//     }
//   }
//   console.log(arr);
//   configureSetup(arr);
// });
