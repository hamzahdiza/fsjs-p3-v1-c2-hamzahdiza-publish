"use strict";
const { hash } = require("../helpers/bcrypt");
const fs = require("fs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let userData = JSON.parse(fs.readFileSync("./db/users.json", "utf-8"));
    userData = userData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.password = hash(el.password);
      return el;
    });

    let categoriesData = JSON.parse(fs.readFileSync("./db/categories.json", "utf-8"));
    categoriesData = categoriesData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    function slugGenerate(str) {
      return str.split(" ").join("-");
    }

    let productsData = JSON.parse(fs.readFileSync("./db/products.json", "utf-8"));
    productsData = productsData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();

      const randomNumber = Math.floor(Math.random() * 1000);
      const nameProduct = `${randomNumber} ${el.name}`;
      const lowerCase = nameProduct.toLowerCase();
      const createSlug = slugGenerate(lowerCase);
      el.slug = createSlug;
      return el;
    });

    let imagesData = JSON.parse(fs.readFileSync("./db/images.json", "utf-8"));
    imagesData = imagesData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Users", userData, null);
    await queryInterface.bulkInsert("Categories", categoriesData, null);
    await queryInterface.bulkInsert("Products", productsData, null);
    await queryInterface.bulkInsert("Images", imagesData, null);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
