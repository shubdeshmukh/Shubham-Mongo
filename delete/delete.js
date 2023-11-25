//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
const url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//database name
let dbName = 'miniproject'
//create restapi
router.post("/", (req, res) => {
    let obj = {
        "p_id": req.body.p_id
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db("nodedb")
            db.collection('products').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'delete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                        console.log("Data deleted ")
                        res.json({ 'delete': 'success' })
                    } else {
                        console.log("Data Not deleted ")
                        res.json({ 'delete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})

//delete product from cart
router.post("/deleteCart", (req, res) => {
    let p_id = req.body.p_id
    let uname = req.body.uname
    let obj = { "qty": req.body.qty 
}

     //connect to mongodb
     mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('products').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'cartDelete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                        console.log("cartData deleted ")
                        res.json({ 'cartDelete': 'success' })
                    } else {
                        console.log("cartData Not deleted ")
                        res.json({ 'cartDelete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})


//export router
module.exports = router

