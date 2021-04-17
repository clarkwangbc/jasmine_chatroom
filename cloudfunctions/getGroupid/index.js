// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-7g3dru6t63518b7d'}
)

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
  })
  return await db.collection("user").doc(wxContext.OPENID).get()
}