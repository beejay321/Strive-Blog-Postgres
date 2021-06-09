const Author = (sequelize, DataTypes) => {
    const Author = sequelize.define("author", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      surname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
    return Author;
  };
  export default Author