const express = require("express")
const db = require("./config/database.js")
const member = require("./models/member.js");
const app = express()
const port = 5000
const cors = require("cors");


app.use(express.json())
app.use(cors())



// mongoose
//     .connect("mongodb://localhost:27017/card-details")
//     .then(() => console.log("connect"))
//     .catch((err) => console.log(err))

app.post("/", async (req, res) => {

    try {

        const saved = await member.insertOne(req.body)

        if (saved) {
            return res.status(200).send({
                status: true,
                response: saved,
                message: "saved succesfully"
            })
        } else {
            return res.status(200).send({
                status: false,
                response: "faild",
                message: "saved unsuccesfully"
            })
        }
    } catch (err) {
        return res.status(500).send({
            status: false,
            response: err.message,
            message: "server error"
        })

    }

})



app.listen(port, () => {
    console.log("server starting.....")
})