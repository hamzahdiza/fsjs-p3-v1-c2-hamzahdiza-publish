const { User, Product, Category, Image, sequelize } = require("../models/index");
const { compare } = require("../helpers/bcrypt");
const { encodeToken } = require("../helpers/jwt");

class Controller {
  static async registerAdmin(req, res, next) {
    // res.status(201).json("Berhasil");
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      console.log(req.body);
      let userRegisterData = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({ message: "Register Successfully", userRegisterData });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      console.log(req.body, "Masuk Controller");
      const { email, password } = req.body;
      // console.log(email, "<<<<<<<<<<<<<<<");

      let userLogin = await User.findOne({
        where: {
          email: email,
        },
      });
      // console.log(userLogin);
      // console.log(Object.is(userLogin, null));

      if (!userLogin) {
        throw { name: "invalid-login" };
      }

      let compareResult = compare(password, userLogin.password);
      if (!compareResult) {
        throw { name: "invalid-login" };
      }

      // const { id } = userLogin;
      let access_token = encodeToken({
        id: userLogin.id,
      });
      // console.log(token);
      let sendUsernameForClient = userLogin.username;

      res.status(200).json({
        access_token,
      });
      // res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAllProducts(req, res, next) {
    try {
      const allProducts = await Product.findAll({
        include: [{ model: User }, { model: Category }],
        order: [["createdAt", "DESC"]],
      });
      // console.log(allProducts);
      res.status(200).json(allProducts);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAllImagesBySlug(req, res, next) {
    try {
      const slugProduct = req.params.slugProduct;

      const getIdProduct = await Product.findOne({
        where: {
          slug: slugProduct,
        },
      });

      // console.log(getIdProduct.id);

      const getImage = await Product.findOne({
        where: {
          slug: slugProduct,
        },
        include: [
          {
            model: Image,
            where: {
              productId: getIdProduct.id,
            },
          },
        ],
      });
      // console.log(getImage);

      res.status(200).json(getImage);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postAddProducts(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, description, price, mainImg, categoryId, images: imgUrl } = req.body;
      // console.log(imgUrl[0], "===", imgUrl[1]);
      console.log(req.body);
      const addProduct = await Product.create(
        {
          name: name,
          slug: name,
          description: description,
          price: price,
          mainImg: mainImg,
          authorId: req.user.id,
          categoryId: categoryId,
        },
        { transaction: t }
      );

      let looping = [];
      console.log(imgUrl);

      looping = imgUrl.map((el) => {
        return { productId: addProduct.id, imgUrl: el };
      });
      const imagePost = await Image.bulkCreate(looping, { transaction: t });

      res.status(201).json({ message: "Create Successfully", addProduct, imagePost });
      await t.commit();
    } catch (err) {
      console.log(err);
      await t.rollback();
      next(err);
    }
  }

  static async getProductbySlug(req, res, next) {
    try {
      const slugProduct = req.params.slugProduct;

      const getIdProduct = await Product.findOne({
        where: {
          slug: slugProduct,
        },
      });
      console.log(getIdProduct.id, "<<<<<<<<<<<<");
      const ProductyBySlug = await Product.findOne({
        where: {
          id: getIdProduct.id,
        },
        include: [
          { model: Category },
          {
            model: Image,
            where: {
              productId: getIdProduct.id,
            },
          },
        ],
      });

      if (ProductyBySlug) {
        res.status(200).json(ProductyBySlug);
      } else {
        throw { name: "data-not-found" };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async putEditProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const slugProduct = req.params.slugProduct;
      // console.log(req.params.slugProduct);
      const { name, description, price, mainImg, categoryId, images: imgUrl } = req.body;
      // console.log(name, description, price, mainImg, categoryId, imgUrl);

      const getIdProduct = await Product.findOne({
        where: {
          slug: slugProduct,
        },
      });
      console.log(getIdProduct);

      const editProduct = await Product.update(
        {
          name: name,
          description: description,
          price: price,
          mainImg: mainImg,
          authorId: req.user.id,
          categoryId: categoryId,
        },
        { where: { slug: slugProduct } },
        { transaction: t }
      );

      const destroyPrevImage = await Image.destroy(
        {
          where: {
            productId: getIdProduct.id,
          },
        },
        { transaction: t }
      );

      let looping = [];

      looping = imgUrl.map((el) => {
        return { productId: getIdProduct.id, imgUrl: el };
      });
      const imageEdit = await Image.bulkCreate(
        looping,
        {
          where: {
            productId: editProduct.id,
          },
        },
        {
          updateOnDuplicate: ["productId"],
        },
        { transaction: t }
      );

      res.status(201).json({ message: "Edit Successfully", editProduct, imageEdit });
      await t.commit();
    } catch (err) {
      console.log(err);
      await t.rollback();
      next(err);
    }
  }

  static async deleteProductbySlug(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const idProduct = req.params.idProduct;

      const findProductById = await Product.findOne(
        {
          where: {
            id: idProduct,
          },
        },
        { transaction: t }
      );

      if (!findProductById) {
        throw { name: "data-not-found" };
      }

      const destroyImages = await Image.destroy(
        {
          where: {
            productId: idProduct,
          },
        },
        { transaction: t }
      );

      const destroyProductById = await Product.destroy(
        {
          where: {
            id: idProduct,
          },
        },
        { transaction: t }
      );
      res.status(200).json({
        message: `${findProductById.name} delete successfully`,
      });
      await t.commit();
    } catch (err) {
      await t.rollback();
      console.log(err);
      next(err);
    }
  }

  // Categories Section ===============================================================
  static async getAllCategories(req, res, next) {
    try {
      const allCategory = await Category.findAll();
      res.status(200).json(allCategory);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postCategory(req, res, next) {
    try {
      const addCategory = await Category.create({
        name: req.body.name,
      });
      res.status(201).json({ message: "Create Category Successfully", addCategory });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const categoryById = req.params.id;
      const findCategoryId = await Category.findOne({
        where: {
          id: categoryById,
        },
      });

      if (findCategoryId) {
        const destroyCategoryId = await Category.destroy({
          where: {
            id: categoryById,
          },
        });
        res.status(200).json({
          message: `${findCategoryId.name} delete successfully`,
        });
      } else {
        throw { name: "data-not-found" };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
