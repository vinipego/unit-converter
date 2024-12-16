//test button
const testBtn = document.querySelector("#test-button");
const heroTitle = document.querySelector("#hero-title");
const unitInput = document.querySelector("#unit-input");
const listLength = document.querySelector("#list-length");
const listTemperature = document.querySelector("#list-temperature");
const listWeight = document.querySelector("#list-weight");
const lengthConverter = [
  "Meter",
  "Kilometer",
  "Centimeter",
  "Milimeter",
  "Yard",
  "Foot",
  "Inch",
];
const temperatureConverter = ["Celsius", "Kelvin", "Fahrenheit"];
const weightConverter = [
  "Kilogram",
  "Gram",
  "Miligram",
  "Metric Ton",
  "Pound",
  "Ounce",
  "Carrat",
];
const fromUnit = document.querySelector("#from-unit");
const toUnit = document.querySelector("#to-unit");

//test buttom
testBtn.addEventListener("click", () => {
  console.log(Boolean(fromUnit.value));
});

heroTitle.addEventListener("click", () => {
  location.reload();
});

// prevent input field to receive anything that is not a number.
//replace(/[^0-9]/g, "")
unitInput.addEventListener("input", (e) => {
  let value = e.target.value;
  value = value.replace(/[^0-9]/g, "");
  e.target.value = value;
});

listLength.addEventListener("click", () => {
  selectMenu(listLength);
  generateConverterList(listLength, lengthConverter);
});
listTemperature.addEventListener("click", () => {
  selectMenu(listTemperature);
  generateConverterList(listTemperature, temperatureConverter);
});
listWeight.addEventListener("click", () => {
  selectMenu(listWeight);
  generateConverterList(listWeight, weightConverter);
});

fromUnit.addEventListener("click", (e) => {
  let arrPairConverter = [];
  if (e.target.value) {
    switch (true) {
      case lengthConverter.includes(e.target.value):
        arrPairConverter = lengthConverter;
        break;
      case temperatureConverter.includes(e.target.value):
        arrPairConverter = temperatureConverter;
        break;
      case weightConverter.includes(e.target.value):
        arrPairConverter = weightConverter;
        break;
    }
    // the splice() built-in function WILL change the original array lengthConverter[]
    // even though the original array is declared as a const.
    // more info: https://stackoverflow.com/questions/50628071/since-const-is-not-usefull-to-create-an-immutable-array-in-javascript-i-dont-k
    const arr = arrPairConverter.toSpliced(
      arrPairConverter.indexOf(e.target.value),
      1
    );
    generatePairConverterList(arr);
  }
});

// adds the class "menuon" to the list that was clicked and removed the class "menuon" from the other lists if they have it. Does nothing if they don't.
function selectMenu(clickedList) {
  if (!clickedList.classList.contains("menuon")) {
    clickedList.classList.add("menuon");
    if (listLength.classList.contains("menuon") && listLength !== clickedList) {
      listLength.classList.remove("menuon");
    } else if (
      listTemperature.classList.contains("menuon") &&
      listTemperature !== clickedList
    ) {
      listTemperature.classList.remove("menuon");
    } else if (
      listWeight.classList.contains("menuon") &&
      listWeight !== clickedList
    ) {
      listWeight.classList.remove("menuon");
    }
  }
}

function generateConverterList(clickedList, arr) {
  if (clickedList.classList.contains("menuon")) {
    let buildDOM = "";
    for (let i = 0; i < arr.length; i++) {
      buildDOM += `<option value="${arr[i]}">${arr[i]}</option>`;
    }
    fromUnit.innerHTML = buildDOM;
  }
}

function generatePairConverterList(arr) {
  let buildDOM = "";
  for (let i = 0; i < arr.length; i++) {
    buildDOM += `<option value="${arr[i]}">${arr[i]}</option>`;
  }
  toUnit.innerHTML = buildDOM;
}
