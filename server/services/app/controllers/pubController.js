const { User, Product, Category, Image } = require("../models/index");
class PubController {
  static async getAllProducts(req, res, next) {
    try {
      const allProducts = await Product.findAll({
        include: [{ model: Category }],
        order: [["createdAt", "DESC"]],
      });
      // console.log(allProducts);
      res.status(200).json(allProducts);
    } catch (err) {
      console.log(err);
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
}

module.exports = PubController;
