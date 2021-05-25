'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.questions, { as: "questions", foreignKey: "category_id"});
    }
  };
  Categories.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "nama kategori"
    },
    descriptions: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "deskripsi dari kategorinya"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Categories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Categories_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Categories;
};