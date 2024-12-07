import input from "../../read-input.ts";

const operators = ["+", "*"];
const numOfOperators = operators.length;

const equations: number[][] = input
  .split("\n")
  .map((equation) => equation.split(/: | /g).map((n) => Number(n)));

let totalCalibrationResult = 0;

for (const equation of equations) {
  const testValue = equation[0];
  const numbers = equation.slice(1);

  const totalCombinations = numOfOperators ** (numbers.length - 1);

  const results = Array(totalCombinations).fill(numbers[0]);

  for (let i = 0; i < totalCombinations; i++) {
    const combinations = [];
    let temp = i;

    for (let j = 0; j < numbers.length - 1; j++) {
      combinations.push(operators[temp % numOfOperators]);
      temp = Math.floor(temp / numOfOperators);
    }

    for (let n = 1; n < numbers.length; n++) {
      if (combinations[n - 1] === "*") {
        results[i] *= numbers[n];
      } else {
        results[i] += numbers[n];
      }
    }
  }

  if (results.includes(testValue)) totalCalibrationResult += testValue;
}

console.log("Total calibration result: " + totalCalibrationResult);
