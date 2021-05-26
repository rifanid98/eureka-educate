'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Categories, { as: "category", foreignKey: "category_id"});
      this.belongsTo(models.SubCategories, { as: "sub_category", foreignKey: "sub_category_id"});
    }
  };
  Questions.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "soal"
    },
    answer_a: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "jawaban untuk soal pilihan ganda"
    },
    answer_b: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "jawaban b untuk soal pilihan ganda"
    },
    answer_c: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "jawaban c untuk soal pilihan ganda"
    },
    answer_d: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "jawaban d untuk soal pilihan ganda"
    },
    correct_answer_pg: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "jawaban yang benar untuk soal pilihan ganda"
    },
    correct_answer_essay: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "jawaban yang benar untuk soal essay"
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "kategori soal",
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    sub_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "sub kategori soal",
      references: {
        model: 'sub_categories',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Questions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "questions_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Questions;
};