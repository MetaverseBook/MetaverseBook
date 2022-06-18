
const ipfsAPI = require('ipfs-api');
const fs  = require('fs');
const host = require('../utils/constant').host
const port = require('../utils/constant').port

const ipfs = ipfsAPI({host: host, port: port, protocol: 'http'});

/**
 *
 * @param addPath
 * @param next
 * @returns {Promise<unknown>}
 */
function addbypath({addPath}, next) {
  return new Promise((resolve,reject)=>{
    try {
      let buffer = fs.readFileSync(addPath);
      ipfs.add(buffer, function (err, files) {
        if (err || typeof files == "undefined") {
          reject(err);
        } else {
          resolve(files[0].hash);
        }
      })
    }catch(ex) {
      reject(ex);
    }
  })
}


/**
 *
 * @param hash
 * @param getPath
 * @param next
 * @returns {Promise<unknown>}
 */
function findfilebyhash({hash,getPath}, next) {
  return new Promise((resolve,reject)=>{
    try{
      ipfs.get(hash,function (err,files) {
        if (err || typeof files == "undefined") {
          reject(err);
        }else{
          fs.writeFileSync(getPath,files[0].content);
          resolve('ok');
        }
      })
    }catch (ex){
      reject(ex);
    }
  });
}


/**
 * 添加关联关系使用
 * @param addPath
 * @param next
 * @returns {function(): Promise<>}
 */
function addbuydag({dataJson}, next) {
  const run = async () => {
    let cid = await ipfs.dag.put({ dataJson })
    return cid
  }
  return run
}

/**
 *
 * @param cid
 * @param next
 * @returns {function(): Promise<GetResult>}
 */
function findbuydag({cid}, next) {

    const result  =   ipfs.dag.get(cid)
    return result
}


module.exports = {
  addbypath,
  json2ipfs,
  addbuydag,
  findbuydag
}
