const { writeFile } = require('fs').promises;

module.exports = writeSurfer = async (data) => {
  const result = await writeFile('./surfers.json', JSON.stringify(data));
  return result;
};
