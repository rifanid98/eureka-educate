'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subcategories', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: true,
        comment: "nama sub kategori"
      },
      descriptions: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "deskripsi dari sub kategorinya"
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
    await queryInterface.dropTable('subcategories');
  }
};