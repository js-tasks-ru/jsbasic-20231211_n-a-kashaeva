function hideSelf() {
  let button = document.querySelector('.hide-self-button')
  button.addEventListener('click', buttonHide)
  function buttonHide() {
    button.hidden = true;
  }
}
