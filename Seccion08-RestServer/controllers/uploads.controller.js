
const { request, response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");



const uploadArchive = async (req = request, res = response) => {

  try {
    // const nameFile = await uploadFile(req.files, ['text', 'md'], 'textos');
    const nameFile = await uploadFile(req.files, undefined, 'imgs');
    
    res.json({
      nameFile
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({error})
  }


}

const updateImage = async (req, res = response) => {
  
  const {id, collection} = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          message: 'Not exists user ' + id
        })
      }
      break;

    case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          message: 'Not exists product ' + id
        })
      }
      break;
  
    default:
      res.status(500).json({message: 'Error update image'})
      break;
  }

  const nameFile = await uploadFile(req.files, undefined, collection);
  model.image = nameFile 

  await model.save()

  res.json(model)
}


module.exports = {
  uploadArchive,
  updateImage
}