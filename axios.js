const axios = require("axios")

function query(url) {
  return new Promise((reslove, reject) => {
    axios({
      method: 'get',
      url,
    }).then(res => {
      reslove(res)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = query