const { response, request } = require('express')
const { Product } = require('../models')

const getProducts = async (req = request, res = response) => {
  
  const { limit = 5, from = 0 } = req.query

  const [total, products] = await Promise.all([
    Product.countDocuments({ status: true}),
    Product.find({ status: true})
    .populate('user', 'name')
    .populate('category', 'name')
    .skip(Number(from))
    .limit(Number(limit))
  ])

  res.json({
    total,
    products
  })
  
}

const getProductById = async (req = request, res = response) => {

  const { id } = req.params;
  const product = await Product.findById( id ).populate('user', 'name').populate('category', 'name');

  if (!product.status) {
    return res.status(400).json({
      message: 'Product deleted'
    })
  }
  res.json( product );
}

const createProduct = async (req, res = response) => {
  
  const { status, user, ...body } = req.body;
  const productDB = await Product.findOne({ name: body.name });

  if ( productDB ) {
    return res.status(400).json({
      message: `The ${productDB.name} product exists`
    })
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id
  }

  const product = await new Product( data ).populate('user', 'name')
  
  await product.save();

  res.status(201).json(product);

}

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }
  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, {new: true});
  res.json(product);
}

const deleteProduct = async (req = request, res = response) => {

  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, {status: false}, {new: true})
  
  res.json({
    message: 'Product deleted!',
    product
  });
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}