
const { request, response } = require("express");
const { uploadFile } = require("../helpers");



const uploadArchive = async (req = request, res = response) => {
  
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    return res.status(400).json({message: 'No files were uploaded.'})
  }

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




module.exports = {
  uploadArchive
}