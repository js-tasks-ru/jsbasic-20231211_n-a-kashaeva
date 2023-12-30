function camelize(str) {
  let words = str.split('-');
  let new_words = [];
  new_words.push(words[0])
  for (let word of words.slice(1)) {
    word = word.charAt().toUpperCase() + word.slice(1);
    new_words.push(word);
  }
  return new_words.join('');
}
