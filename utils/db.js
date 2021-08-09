const MongoClient = require('mongodb').MongoClient;
const Config = require('./config.js');
 
class Db {

        //单例
        static getInstance(){
            if(!Db.instance){
                Db.instance=new Db()
            }
            return Db.instance   
        }
    
    constructor() {
        this.dbClient="";
        // this.connect()
    }

    //连接数据库
    connect() { 
       console.time('time_connect')
       return new Promise((resolve, reject) => {
            if(!this.dbClient){
                MongoClient.connect(Config.dbUrl, { useUnifiedTopology:true },(err, client) => {
                    if (err) {
                        console.log("连接数据库失败")
                        reject(err)
                        return
                    }
                    this.dbClient = client.db(Config.dbName);
                    console.log("连接数据库成功")
                    console.timeEnd('time_connect')
                    resolve(this.dbClient)
                })
            }else{
                resolve(this.dbClient)
            }
       })
    }
    //查询数据
    find(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {//连接数据库返回的db对象
                db.collection(collectionName).find(json).toArray(function (err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                })
            })
        })
    }

    //新增数据
     add(collectionName, json){
        return new Promise((resolve,reject) =>{
            this.connect().then( async db=>{
              let result = await db.collection(collectionName).insertOne(json);
              resolve(result);
            })
        })
     }

     //更新数据

}

module.exports=Db
 
// const myDb1 = Db.getInstance() //相当于 myDb1 = new Db()
// console.time('time_find1')
// myDb1.find('user', {}).then(data => {
//     console.log("查询数据1",data);
//     console.timeEnd('time_find1')
// })
 
// const myDb2 = Db.getInstance() //相当于 myDb2 = Db.instance
// setTimeout(()=>{
//     console.time('time_find2')
//     myDb2.find('user', { "name": "jack5" }).then(data => {
//         console.log("查询数据2");
//         console.timeEnd('time_find2')
//     })
// },2000)