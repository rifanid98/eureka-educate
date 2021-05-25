// const Models = require('../models');

class Repositories {
  /**
   * Get
   * @param {number} id
   * @returns {Promise<number>} number
   */
  get(id: number): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(id);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new Repositories();
