const lockScreenMatrix = [
  ['A', 'B', 'C'],
  ['D', 'E', 'F'],
  ['G', 'H', 'I'],
];

function calculateCombinations(startCharacter, patternLength) {
  const startCoordinates = getStartCoordinates(startCharacter);
  if (!startCoordinates) {
    throw 'Not valid start character!';
  }

  return getPossiblePatternsForCoordinates(startCoordinates, patternLength - 1, startCharacter);
}

function getStartCoordinates(startCharacter) {
  for (let y = 0; y < lockScreenMatrix.length; y++) {
    for (let x = 0; x < lockScreenMatrix[0].length; x++) {
      if (lockScreenMatrix[y][x] === startCharacter) {
        return { x, y }
      }
    }
  }
  return null;
}

function getPossiblePatternsForCoordinates(
  currentCoordinates,
  numberOfRemainingMoves,
  currentPattern,
  validPatterns = []
) {
  if (!numberOfRemainingMoves) {
    return [...validPatterns, currentPattern];
  }

  const result = [...validPatterns];

  for (let tresholdY = -2; tresholdY <= 2; tresholdY++) {
    for (let tresholdX = -2; tresholdX <= 2; tresholdX++) {
      getPossiblePatternsFromNextCharacter(currentCoordinates, tresholdX, tresholdY, numberOfRemainingMoves, currentPattern, result).forEach(pattern => {
        if (!result.includes(pattern)) {
          result.push(pattern);
        }
      })
    }
  }
  return result;
}

function getPossiblePatternsFromNextCharacter(currentCoordinates, tresholdX, tresholdY, numberOfRemainingMoves, currentPattern, result) {
  const nextCoordinates = { x: currentCoordinates.x + tresholdX, y: currentCoordinates.y + tresholdY }
  const nextCharacter = lockScreenMatrix[nextCoordinates.y]?.[nextCoordinates.x];
  return canMoveToNextCharacter(currentCoordinates, nextCharacter, tresholdX, tresholdY, currentPattern)
    ? getPossiblePatternsForCoordinates(nextCoordinates, numberOfRemainingMoves - 1, currentPattern + nextCharacter, result)
    : [];
}

function canMoveToNextCharacter(currentCoordinates, nextCharacter, tresholdX, tresholdY, currentPattern) {
  const isNextCharacterValid = !!nextCharacter && !currentPattern.includes(nextCharacter);
  if (!isNextCharacterValid) {
    return false;
  }

  let crossedCharacterTresholdX = tresholdX;
  let crossedCharacterTresholdY = tresholdY;

  if (abs(tresholdX) > 1 && abs(tresholdY) > 1) {
    crossedCharacterTresholdX = tresholdX < 0 ? tresholdX + 1 : tresholdX - 1;
    crossedCharacterTresholdY = tresholdY < 0 ? tresholdY + 1 : tresholdY - 1;
  } else if (abs(tresholdX) > 1 && abs(tresholdY) < 1) {
    crossedCharacterTresholdX = tresholdX < 0 ? tresholdX + 1 : tresholdX - 1;
  } else if (abs(tresholdY) > 1 && abs(tresholdX) < 1) {
    crossedCharacterTresholdY = tresholdY < 0 ? tresholdY + 1 : tresholdY - 1;
  }

  const crossedCoordinates = { x: currentCoordinates.x + crossedCharacterTresholdX, y: currentCoordinates.y + crossedCharacterTresholdY };
  const crossedCharacter = lockScreenMatrix[crossedCoordinates.y]?.[crossedCoordinates.x];

  return crossedCharacter === nextCharacter || currentPattern.includes(crossedCharacter);;
}

function abs(x) {
  return x < 0 ? -x : x;
}

const patterns = calculateCombinations('E', 2);
console.log(patterns, patterns.length);
