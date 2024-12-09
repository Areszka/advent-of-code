import input from "../../read-input.ts";

let files = [];
let k = 0;

for (let i = 0; i < input.length; i++) {
  const count = Number(input[i]);
  const valueIsNumber = i % 2 === 0;

  if (count !== 0) files.push([count, valueIsNumber ? k : null]);

  if (valueIsNumber) k++;
}

let listOfNumb = files.filter((f) => f[1] !== null);

let arr = structuredClone(files);

for (let g = listOfNumb.length - 1; g >= 0; g--) {
  const lastNumber = listOfNumb[g];
  arr = getArr(arr, lastNumber);
}

function getArr(readyArr: [number, number][], number: [number, number]) {
  let firtDotsIndex = readyArr.findIndex((e) => e[0] >= number[0] && e[1] === null);
  let numberIndex = readyArr.findIndex((e) => e[1] === number[1]);

  if (firtDotsIndex === -1 || numberIndex < firtDotsIndex) {
    return readyArr;
  }

  const firstDots = readyArr[firtDotsIndex];

  if (firstDots[0] === number[0]) {
    const nextA = [...readyArr];

    nextA[firtDotsIndex][1] = number[1];
    nextA[numberIndex][1] = null;

    return nextA;
  }

  let nextA = [
    ...readyArr.slice(0, firtDotsIndex),
    number,
    [Number(firstDots[0]) - number[0], null],
    ...readyArr.slice(firtDotsIndex + 1),
  ];

  nextA[numberIndex + 1][1] = null;

  if (nextA[firtDotsIndex + 1][1] === null && nextA[firtDotsIndex + 2][1] === null) {
    nextA = nextA.splice(firtDotsIndex + 1, 2, [
      nextA[firtDotsIndex + 1][0] + nextA[firtDotsIndex + 2][0],
      null,
    ]);
  }

  return nextA;
}

let checksum = 0;

const arrrr = [];

arr.forEach((s) => {
  for (let i = 0; i < s[0]; i++) {
    arrrr.push(s[1]);
  }
});

arrrr.forEach((b, i) => {
  if (b !== null) {
    checksum += Number(b) * i;
  }
});

console.log(checksum);
