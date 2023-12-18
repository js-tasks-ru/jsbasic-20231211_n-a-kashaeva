function factorial(n) {
  if (n < 0) {
    return -1;
  } else if (n == 0) {
    return 1;
  } else {
    let answer = 1;
    for (let i=1; i<=n; i++) {
      answer *= i;
    }
      return answer;
  }
  }
