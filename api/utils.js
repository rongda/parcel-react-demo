/* eslint-disable */
const utils = require('utility')

const md5 = pwd => {
  let sugar = 'Roda_Alin_Small_Pig'
  return utils.md5(utils.md5(`${sugar}${pwd}`))
}

module.exports = {
  md5
}
