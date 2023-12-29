function showSalary(users, age) {
  let filteredUsers = users.filter(user => user.age <= age);
  let salaries = filteredUsers.map(user => `${user.name}, ${user.balance}`);
  return salaries.join('\n');
}
