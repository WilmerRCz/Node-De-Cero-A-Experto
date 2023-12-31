const { response, request } = require('express')
const { Category } = require('../models')

const getCategories = async (req = request, res = response) => {
  
  const { limit = 5, from = 0 } = req.query

  const [total, categories] = await Promise.all([
    Category.countDocuments({ status: true}),
    Category.find({ status: true})
    .populate('user', 'name')
    .skip(Number(from))
    .limit(Number(limit))
  ])

  res.json({
    total,
    categories
  })
  
}

const getCategoryById = async (req = request, res = response) => {

  const { id } = req.params;
  const category = await Category.findById( id ).populate('user', 'name');

  if (!category.status) {
    return res.status(400).json({
      message: 'Category deleted'
    })
  }
  res.json( category );
}

const createCategory = async (req, res = response) => {
  
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name })

  if ( categoryDB ) {
    return res.status(400).json({
      message: `The ${categoryDB.name} category exists`
    })
  }

  const data = {
    name,
    user: req.user._id
  }

  const category = await new Category( data ).populate('user', 'name');;
  await category.save();

  res.status(201).json(category);

}

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, {new: true});
  res.json(category);
}

const deleteCategory = async (req = request, res = response) => {

  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true})
  
  res.json({
    message: 'Category deleted!',
    category
  });
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}