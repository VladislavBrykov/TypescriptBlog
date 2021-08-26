import fs from 'fs';

function renameImage(imageFilename) {
  const newName = `uploads/${imageFilename}.jpg`;
  fs.rename(`uploads/${imageFilename}`, newName, (err) => {
    if (err) {
      throw err;
    }
    console.log('renamed complete');
  });
  return newName;
}

export default renameImage;
