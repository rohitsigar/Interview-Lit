const users = [];

export const addUser = ({ id, email, room }) => {
  if (email === '') return { error: 'Empty Email' };
  const existingUser = users.find(
    user => user.room === room && user.email === email
  );

  if (existingUser) {
    return { error: 'Username is taken' };
  }

  const user = { id, email, room };

  users.push(user);
  return { user };
};

export const removeUser = email => {
  const user = users.find(user => user.email === email);
  const index = users.findIndex(user => user.email === email);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return user;
};

export const getUser = id => users.find(user => user.id === id);

export const getUsersInRoom = room => users.filter(user => user.room === room);
