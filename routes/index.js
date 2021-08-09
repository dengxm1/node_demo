const router = require('koa-router')()
const {User} = require('../model/user');
const Db=require('../utils/db')
const db = Db.getInstance();

router.get('/',async (ctx, next) => {
   let res = await db.find("user",{});
   console.log(res)
   let data={
      code:200,
      message:'查询成功',
      data:res
   }
   ctx.body=data
  // await ctx.render('index', {
  //   title: 'Hello Koa 2!'
  // })

})

router.get('/add', async (ctx, next) => {

  let sql={"name":'huahua',age:11}
  let res = await db.add("user",sql);
  let data=''
  if(res.acknowledged){
     data={
        code:200,
        message:'新增成功'
      }
  }else{
    data={
      code:500,
      message:'新增失败'
    }
  }
  ctx.body = data
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
