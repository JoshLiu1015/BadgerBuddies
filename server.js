const express = require("express");
const app = express();

app.use(express.json());

app.use("/user", require("./routes/userRoutes"));

// app.get("/", (req, res) => {
//     res.status(200).send("heeellllooooo");
// })



app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
})

