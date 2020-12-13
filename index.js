const nodemailer = require("nodemailer");
const axios = require('./axios')
var CronJob = require('cron').CronJob
  // 发送邮件函数
async function sendMail(text) {
  var user = "xxxxxxxxxx@qq.com"; //自己的邮箱
  var pass = "xxxxxxxxxx"; //qq邮箱授权码 
  // qq邮箱授权码 https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=1001256&&id=28
  var to = "xxxxxxxxxx@qq.com"; //对方的邮箱  1971544667
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
      user: user, // 用户账号
      pass: pass, //授权码,通过QQ获取
    },
  });
  let info = await transporter.sendMail({
    from: `xxxxxxx<${user}>`, // sender address
    to: `xxxxxxx<${to}>`, // list of receivers
    subject: "xxxxxxx", // Subject line
    text: text, // plain text body
  });
  console.log("发送成功：" + text);
}


// qq邮箱限制发送10封邮件需冷却12分钟
new CronJob('00 */15 * * * *', async() => {
  console.log(new Date().toLocaleString())
  for (let i = 1; i <= 10; i++) {
    const data = await axios('https://chp.shadiao.app/api.php')
    if (!data.data) return
    await sendMail(data)
  }
}, null, true);