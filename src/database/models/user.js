module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATE },

    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {});
  return user;
};
