const Comment = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },      
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
    return Comment;
  };
  export default Comment;
  