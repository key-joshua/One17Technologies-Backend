const userOne = {
  name: 'Arjun',
  phone: '+917021007499',
  dob: '1994-09-15',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userTwo = {
  name: 'Joshua',
  phone: '+250789619442',
  dob: '1996-10-11',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userThree = {
  name: 'Paras',
  phone: '+2507896109430',
  dob: '1990-01-01',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('Users', [userOne, userTwo, userThree]);
const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});
export { up, down };
