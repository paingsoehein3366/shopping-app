import express, { json } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { db } from "./db/db";
const app = express();

app.use(cors());
app.use(json());
app.use(express.static("public"));

app.post("/setFile", async (req, res) => {
    const { file, Tshirt } = req.body;
    const isVaild = file && Tshirt;
    if (!isVaild) return res.send(400);
    res.send(200);
});
// category
app.post("/createCategory", async (req, res) => {
    const { name } = req.body;
    if (!name) return res.send(400);
    await db.query("insert into shirt_categories (name) values($1) ", [name]);
    res.send(200);
});
app.get("/category", async (req, res) => {
    const categoryFromDataRow = await db.query("select * from shirt_categories");
    const categoryFromData = categoryFromDataRow.rows;
    if (!categoryFromData) return res.send(400);
    res.send(categoryFromData);
});
// createShirt
app.post("/createShirt", async (req, res) => {
    const { price, name, category, id } = req.body;
    const isVaild = price && name && category && id;
    if (!isVaild) return res.send(400);

    await db.query(`update shirts set title = $1 ,price = $2 where id = ${id}`, [name, price]);
    const categoryFromDataRow = await db.query("select * from shirt_categories");
    const categoryFromDataId = categoryFromDataRow.rows.filter(item => category.includes(item.name)).map(item => item.id);
    await db.query("insert into shirt_categories_shirts (shirt_categories_id,shirts_id) values($1,$2)", [Number(categoryFromDataId), Number(id)]);
    res.send(200);
});
// shirt
app.get("/shirt", async (req, res) => {
    const shirtDataFrom = await db.query("select * from shirts");
    const shirtDataFromRow = shirtDataFrom.rows;
    if (!shirtDataFromRow.length) return res.send(400);
    res.send(shirtDataFromRow);
});
// get shirt and category
app.get("/getShirtCategory", async (req, res) => {
    const getId = await db.query("select * from shirt_categories_shirts");
    const getIdRow = getId.rows;
    if (!getIdRow.length) return res.send(400);
    res.send(getIdRow);
});
// storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
})
const upload = multer({ storage })
// file upload
app.post("/upload", upload.single("file"), async (req, res) => {
    const image = req.file?.filename;
    db.query("insert into shirts(url) values($1)", [image], (err, result) => {
        if (err) return res.json({ Message: "Error" });
        return res.json({ Status: "Success" });
    });
})
// server run
app.get("/", async (req, res) => {
    res.send("get starting.....");
});

app.listen(5000, () => {
    console.log("server is running.....");
});