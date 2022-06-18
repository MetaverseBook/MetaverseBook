const { env } = require('./env')
const UPLOAD_PATH = env === 'dev' ?
  '/Users/sam/upload/admin-upload-ebook' :
  '/root/upload/admin-upload-ebook'

const UPLOAD_URL = env === 'dev' ?
  'http://test.metabook.me:8089/admin-upload-ebook' :
  'https://book.metabook.me/admin-upload-ebook'

const OLD_UPLOAD_URL = env === 'dev' ?
  'http://test.metabook.me:8089/book/res/img' :
  'https://book.metabook.me/book/res/img'

const network = {
  "network" : [
    {
      "title" : "Ropsten (3) network",
      "httpApi" : "https://kovan.infura.io/v3/82af007db9b8429eb49f7502e3938acd",
    }
  ]
};
const host = ""
const port = ""


  module.exports = {
    CODE_ERROR: -1,
    CODE_TOKEN_EXPIRED: -2,
    CODE_SUCCESS: 0,
    PWD_SALT: 'admin_book_node',
    PRIVATE_KEY: 'admin_book_node',
    JWT_EXPIRED: 60 * 60, // token失效时间
    UPLOAD_PATH, // 上传文件路径
    UPLOAD_URL, // 上传文件URL前缀
    MIME_TYPE_EPUB: 'application/epub+zip',
    UPDATE_TYPE_FROM_WEB: 1,
    OLD_UPLOAD_URL
  }
