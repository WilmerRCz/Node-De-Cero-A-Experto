const path = require('path');
const { v4: uuidv4 } = require('uuid')

const allowedExtension = [
  'png',
  'jpg',
  'jpeg',
  'gif'
]

const uploadFile = ( files, allowedExtensions = allowedExtension, folder = '' ) => {

  return new Promise ((resolve, reject) => {

    const { myFile } = files;
    const cutNameFile = myFile.name.split('.');
    const extension = cutNameFile[cutNameFile.length - 1]
    
    // Validar extension
    if (!allowedExtensions.includes(extension)) {
      return reject('The extension is not allowed ' + allowedExtensions)
    }

    const temporalName = uuidv4() + '.' + extension;

    const uploadPath = path.join(__dirname, '../uploads/', folder, temporalName);

    myFile.mv(uploadPath, (err) => {
      if (err) {
        reject(err)
      }

      resolve(temporalName);

    })

  })

}


module.exports = {
  uploadFile
}