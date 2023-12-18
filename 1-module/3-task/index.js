function ucFirst(str) {
  if (str) {
    let firstSymbol = str.at(0).toUpperCase();
    strCapitalized = firstSymbol + str.slice(1);
    return strCapitalized;
  } else {
    return str;
  }

}
