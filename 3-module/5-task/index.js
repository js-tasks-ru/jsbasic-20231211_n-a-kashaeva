function getMinMax(str) {
  let array = str.split(' ');
  let numbers = array.filter(symbol => isFinite(symbol)).map(number => +number);
  return {
    min: Math.min( ...numbers ),
    max: Math.max.apply(null, numbers),
  }
}
