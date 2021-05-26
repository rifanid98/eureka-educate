'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questions', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "soal"
      },
      answer_a: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "jawaban untuk soal pilihan ganda"
      },
      answer_b: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "jawaban b untuk soal pilihan ganda"
      },
      answer_c: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "jawaban c untuk soal pilihan ganda"
      },
      answer_d: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "jawaban d untuk soal pilihan ganda"
      },
      correct_answer_pg: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "jawaban yang benar untuk soal pilihan ganda"
      },
      correct_answer_essay: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "jawaban yang benar untuk soal essay"
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "kategori soal",
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "sub kategori soal",
        references: {
          model: 'SubCategories',
          key: 'id'
        }
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Questions');
  }
};