//test button
const testBtn = document.querySelector("#test-button");
const heroTitle = document.querySelector("#hero-title");
const unitInput = document.querySelector("#unit-input");
const unitOutput = document.querySelector("#unit-output");
const listLength = document.querySelector("#list-length");
const listTemperature = document.querySelector("#list-temperature");
const listWeight = document.querySelector("#list-weight");
const lengthConverter = [
  "Meter",
  "Kilometer",
  "Centimeter",
  "Mile",
  "Yard",
  "Foot",
  "Inch",
];
const temperatureConverter = ["Celsius", "Kelvin", "Fahrenheit"];
const weightConverter = ["Kilogram", "Gram", "Ton", "Pound", "Ounce"];
const fromUnit = document.querySelector("#from-unit");
const toUnit = document.querySelector("#to-unit");

//test buttom
testBtn.addEventListener("click", () => {
  console.log(unitInput.value);
  unitOutput.textContent = "Test";
});

heroTitle.addEventListener("click", () => {
  location.reload();
});

unitInput.addEventListener("input", (e) => {
  // prevent input field to receive anything that is not a number.
  //replace(/[^0-9]/g, "")
  let value = e.target.value;
  value = value.replace(/[^0-9]/g, "");
  e.target.value = value;

  makeConversion();
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
    unitOutput.value = "";
  }
});

toUnit.addEventListener("click", (e) => {
  makeConversion();
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
function makeConversion() {
  if (toUnit.value) {
    if (listLength.classList.contains("menuon")) {
      convertLength(fromUnit.value, toUnit.value, unitInput.value);
    } else if (listTemperature.classList.contains("menuon")) {
      convertTemperature(fromUnit.value, toUnit.value, unitInput.value);
    } else if (listWeight.classList.contains("menuon")) {
      convertWeight(fromUnit.value, toUnit.value, unitInput.value);
    }
  } else {
    unitOutput.value = "";
  }
}
function convertLength(keyName, keyValue, inputNum) {
  const lengthConversions = {
    Meter: {
      Kilometer: 0.001,
      Centimeter: 100,
      Mile: 0.0006213689,
      Yard: 1.0936132983,
      Foot: 3.280839895,
      Inch: 39.37007874,
    },
    Kilometer: {
      Meter: 1000,
      Centimeter: 100000,
      Mile: 0.6213688756,
      Yard: 1093.6132983,
      Foot: 3280.839895,
      Inch: 39370.07874,
    },
    Centimeter: {
      Meter: 0.01,
      Kilometer: 0.00001,
      Mile: 0.0000062137,
      Yard: 0.010936133,
      Foot: 0.032808399,
      Inch: 0.3937007874,
    },
    Mile: {
      Meter: 1609.35,
      Kilometer: 1.60935,
      Centimeter: 160935,
      Yard: 1760.0065617,
      Foot: 5280.019685,
      Inch: 63360.23622,
    },
    Yard: {
      Meter: 0.9144,
      Kilometer: 0.0009144,
      Centimeter: 91.44,
      Mile: 0.0005681797,
      Foot: 3,
      Inch: 36,
    },
    Foot: {
      Meter: 0.3048,
      Kilometer: 0.0003048,
      Centimeter: 30.48,
      Mile: 0.0001893932,
      Yard: 0.3333333333,
      Inch: 12,
    },
    Inch: {
      Meter: 0.0254,
      Kilometer: 0.0000254,
      Centimeter: 2.54,
      Mile: 0.0000157828,
      Yard: 0.0277777778,
      Foot: 0.0833333333,
    },
  };
  const output = lengthConversions[keyName][keyValue] * inputNum;
  unitOutput.value = Number(output.toFixed(8));
}
// temperature's formula isn't as straightfoward as Length and Weight. That's not to say it's difficult, but it seems a little difficult through the same method as the other 2 functions were designed.
function convertTemperature(keyName, keyValue, inputNum) {
  if (keyName === "Celsius" && keyValue === "Kelvin"){
    const output = Number(inputNum) + 273.15;
    unitOutput.value = Number(output.toFixed(8));
  } else if (keyName === "Celsius" && keyValue === "Fahrenheit"){
    const output = (Number(inputNum)*1.8)+32;
    unitOutput.value = Number(output.toFixed(8));
  } else if (keyName === "Kelvin" && keyValue === "Celsius"){
    const output = Number(inputNum) - 273.15;
    unitOutput.value = Number(output.toFixed(8));
  } else if (keyName === "Kelvin" && keyValue === "Fahrenheit"){
    const output = ((Number(inputNum) - 273.15)*1.8)+32;
    unitOutput.value = Number(output.toFixed(8));
  } else if (keyName === "Fahrenheit" && keyValue === "Celsius"){
    const output = (Number(inputNum)-32)*1.8;
    unitOutput.value = Number(output.toFixed(8));
  } else if (keyName === "Fahrenheit" && keyValue === "Kelvin"){
    const output = ((Number(inputNum) - 32)*(5/9))+273.15;
    unitOutput.value = Number(output.toFixed(8));
  } else {
    unitOutput.value = "Error";
  }
}

function convertWeight(keyName, keyValue, inputNum) {
  
  const weightConversions = {
    Kilogram: {
      Gram: 1000,
      Ton: 0.001,
      Pound: 2.2046244202,
      Ounce: 35.273990723,
    },
    Gram: {
      Kilogram: 0.001,
      Ton: 0.000001,
      Pound: 0.0022046244,
      Ounce: 0.0352739907,
    },
    Ton: {
      Kilogram: 1000,
      Gram: 1000000,
      Pound: 2204.6244202,
      Ounce: 35273.990723,
    },
    Pound: {
      Kilogram: 0.453592,
      Gram: 453.592,
      Ton: 0.000453592,
      Ounce: 16,
    },
    Ounce: {
      Kilogram: 0.0283495,
      Gram: 28.3495,
      Ton: 0.0000283495,
      Pound: 0.0625,
    },
  };

  const output = weightConversions[keyName][keyValue] * inputNum;
  unitOutput.value = Number(output.toFixed(8));
}

generateConverterList(listLength, lengthConverter);
