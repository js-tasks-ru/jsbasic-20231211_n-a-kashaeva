function makeFriendsList(friends) {
  let newUl = document.createElement('ul');
  for (let friend of friends) {
    let li = document.createElement('li');
    li.textContent = `${friend.firstName} ${friend.lastName}`;
    newUl.appendChild(li);
  }
  return newUl;
}
