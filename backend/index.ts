import express, { json } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { db } from "./db/db";
const app = express();

app.use(cors());
app.use(json());
app.use(express.static("public"));
//set file
app.post("/setFile", async (req, res) => {
    const { file, Tshirt } = req.body;
    const isVaild = file && Tshirt;
    if (!isVaild) return res.send(400);
    res.send(200);
});

//cteate category
app.post("/createCategory", async (req, res) => {
    const { name } = req.body;
    if (!name) return res.send(400);
    const categoryFromDataRow = await db.query("select * from shirt_categories");
    const categoryFromData = categoryFromDataRow.rows.filter(item => name.includes(item.name));
    if (categoryFromData.length) {
        const categoryId = categoryFromData.map(item => item.id);
        if (!categoryId) return res.send(400);
        await db.query("update shirt_categories set is_archived = false where id = $1", [Number(categoryId)]);
        return res.send(200);
    };
    await db.query("insert into shirt_categories (name) values($1) ", [name]);
    res.send(200);
});
// get category
app.get("/category", async (req, res) => {
    const categoryFromDataRow = await db.query("select * from shirt_categories where is_archived = false");
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
    const shirtDataFrom = await db.query("select * from shirts where is_archived = false");
    const shirtDataFromRow = shirtDataFrom.rows;
    if (!shirtDataFromRow.length) return res.send(400);
    res.send(shirtDataFromRow);
});

// get shirt and category
app.get("/getShirtCategory", async (req, res) => {
    const getId = await db.query("select * from shirt_categories_shirts where is_archived = false");
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
});
const upload = multer({ storage });

// file upload
app.post("/upload", upload.single("file"), async (req, res) => {
    const image = req.file?.filename;
    db.query("insert into shirts(url) values($1)", [image], (err, result) => {
        if (err) return res.json({ Message: "Error" });
        return res.json({ Status: "Success" });
    });
});

//delete function
app.delete("/delete", async (req, res) => {
    const { Id } = req.body;
    if (!Id) return res.send(400);
    await db.query("update shirts set is_archived = true where id=$1", [Id]);
    res.send(200);
});

//update function
app.put("/update", async (req, res) => {
    const { id, name } = req.body;
    const isVaild = id && name;
    if (!isVaild) return res.send(400);
    await db.query("update shirt_categories set name = $1 where id = $2", [name, id]);
    res.send(200);
});
//delete Category
app.delete("/deleteCategory", async (req, res) => {
    const { deleteCategoryId } = req.body;
    if (!deleteCategoryId) return res.send(400);
    await db.query("update shirt_categories set is_archived = true where id=$1", [Number(deleteCategoryId)]);
    res.send(200);
});
//frondendShowCategory
app.post("/frondendShowCategory", async (req, res) => {
    const { categoryId } = req.body;
    console.log("categoryId: ", categoryId);
    if (!categoryId) return res.send(400);
    const dataFromShirtCategoryShirts = await db.query("select * from shirt_categories_shirts");
    const dataFromShirtCategoryShirtsInShirtId = dataFromShirtCategoryShirts.rows.filter(item => item.shirt_categories_id === Number(categoryId)).map(item => item.shirts_id);
    console.log(dataFromShirtCategoryShirtsInShirtId);
    if (!dataFromShirtCategoryShirtsInShirtId.length) return res.send(401);
    const dataShirts = await db.query(`select * from shirts`);
    const checkShirtId = dataShirts.rows.filter(item => dataFromShirtCategoryShirtsInShirtId.includes(item.id));
    if (!checkShirtId.length) return res.send(402);
    res.send(checkShirtId);
});
// server run
app.get("/", async (req, res) => {
    res.send("get starting.....");
});

app.listen(5000, () => {
    console.log("server is running.....");
});