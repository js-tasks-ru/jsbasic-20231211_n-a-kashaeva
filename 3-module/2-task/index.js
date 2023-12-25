function filterRange(arr, a, b) {
  return arr.filter(i => {
    return i <= b && i >= a;
  });
}
