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
  const _ = db.command
  db.collection("group").doc(event.groupID).update({
    data:{
      members:_.push(wxContext.OPENID),
      total:_.inc(1)
    }
  }).then(console.log)
  .catch(console.error)
  return {
    event
  }
}