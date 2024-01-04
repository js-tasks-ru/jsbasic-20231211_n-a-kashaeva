function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let text = document.getElementById('text');
  button.addEventListener('click', hideText);
  function hideText() {
    text.hidden = !text.hidden
  }
}
