const path = require('path')
const fs = require('fs');
const { request, response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");
const cloudinary = require('cloudinary').v2



cloudinary.config(process.env.CLOUDINARY_URL)

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

  

  if (model.image) {
    const pathImage = path.join(__dirname, '../uploads', collection, model.image)
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage)
    }
  }

  const nameFile = await uploadFile(req.files, undefined, collection);
  model.image = nameFile 

  await model.save()

  res.json(model)
}



const updateImageCloudinary = async (req, res = response) => {
  
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

  

  if (model.image) {
    const nameArr = model.image.split('/');
    const name = nameArr[nameArr.length - 1];
    const folder = nameArr[nameArr.length - 2];
    const [ public_id ] = name.split('.');
    const path = folder + '/' + public_id
    cloudinary.uploader.destroy(path);
  }

  const { tempFilePath } = req.files.myFile
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
    folder: "Curso-NodeJs-FernandoHerrera"
  })

  model.image = secure_url 
  await model.save()

  res.json(model)
}







const getImage = async (req, res = response) => {
  
  const { id, collection } = req.params;

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
      res.status(500).json({message: 'Error get image'})
      break;
  }

  

  if (model.image) {
    const pathImage = path.join(__dirname, '../uploads', collection, model.image)
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage)
    }
  }
  const pathImage = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(pathImage);
}

module.exports = {
  uploadArchive,
  updateImage,
  getImage,
  updateImageCloudinary
}