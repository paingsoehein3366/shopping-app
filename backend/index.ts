import express from "express";
const app = express();

app.get("/", async (req, res) => {
    res.send("get starting.....")
});

app.listen(5000, () => {
    console.log("server is running.....");
});