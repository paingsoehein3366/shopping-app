import { Box, Button, Card, CardActionArea, CardContent, CardMedia, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../config/config";
import AddShirt from "./addShirt";
import Delete from "./Delete";
import LayoutApp from "./LayoutApp";
import Update from "./Update";

const UpdateCategory = () => {
    const param = useParams().id;
    const [dataCategory, setDataCategory] = useState([{ id: 0, name: "" }]);
    const [dataShirt, setDataShirt] = useState([{ id: 0, title: "", price: 0, url: "" }]);
    const [dataShirtAndCategory, setDataShirtAndCategory] = useState([{ shirt_categories_id: 0, shirts_id: 0 }]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addShirtOpen, setAddShirtOpen] = useState(false);
    const [deleteId, setDeleteId] = useState({ id: 0 });
    const [updateName, setUpdateName] = useState({ name: "" });

    const checkCategoryId = dataCategory.filter(item => item.id === Number(param));
    const checkShirtId = dataShirtAndCategory.filter(item => item.shirt_categories_id === Number(param)).map(item => item.shirts_id);
    const checkShirts = dataShirt.filter(item => checkShirtId.includes(item.id));

    useEffect(() => {
        getShirtData();
        dataFromCategory();
        shirtsAndShirtCategory();
    }, [1]);

    //shirt function
    const getShirtData = async () => {
        const response = await fetch(`${config.apiBaseUrl}/shirt`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        });
        if (response.ok) {
            const responseJson = await response.json();
            setDataShirt(responseJson);
        } else {
            return alert("Error!")
        }
    };
    // category function
    const dataFromCategory = async () => {
        const response = await fetch(`${config.apiBaseUrl}/category`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        });
        if (response.ok) {
            const responseJson = await response.json();
            setDataCategory(responseJson);
        } else {
            return alert("!Error...")
        }
    };
    // shirts and shirtCategory function
    const shirtsAndShirtCategory = async () => {
        const response = await fetch(`${config.apiBaseUrl}/getShirtCategory`, {
            method: "GET",
            headers: { "content-type": "application/json" }
        });
        if (response.ok) {
            const responseJson = await response.json();
            setDataShirtAndCategory(responseJson);
        } else {
            return alert("Error!");
        }
    };
    //delete Function
    const deleteFunction = async () => {
        await fetch(`${config.apiBaseUrl}/delete`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ Id: deleteId.id })
        })
        setDeleteOpen(false);
    };

    return (
        <Box>
            <LayoutApp title="EdtiCategory" />
            <Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
                    {/* shirt category */}
                    <Box>
                        {checkCategoryId.map(item => {
                            return (
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={item.id}>
                                    <Typography variant="h6" sx={{ color: "#ffffff", bgcolor: "gray", p: 1, borderRadius: 2 }}>{item.name}</Typography>
                                    <Box sx={{ display: "flex", mt: 2 }}>
                                        <TextField
                                            placeholder="Category Name..."
                                            label="Category Name..."
                                            value={updateName.name}
                                            sx={{ mr: 1 }}
                                            onChange={(evt) => setUpdateName({ ...updateName, name: evt.target.value })}
                                        />
                                        <Button onClick={async () => {
                                            if (!updateName.name) return alert("Please enter category name.")
                                            await fetch(`${config.apiBaseUrl}/update`, {
                                                method: "PUT",
                                                headers: { "content-type": "application/json" },
                                                body: JSON.stringify({ id: item.id, name: updateName.name })
                                            });
                                            setUpdateName({ name: "" });
                                        }} variant="contained">update</Button>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                    {/* shirt */}
                    <Box>
                        <Box sx={{ display: "flex", justifyContent: "center", marginY: 3 }}>
                            <Button onClick={() => setAddShirtOpen(true)} variant="contained" color="success">&#65291; add shirt</Button>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
                            {checkShirts.map(item => {
                                return (
                                    <Box key={item.id}>
                                        <Card sx={{ width: { xs: 150, md: 240 }, m: 2 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="240"
                                                    image={`${config.apiBaseUrl}/images/${item.url}`}
                                                    alt="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div">{item.title}</Typography>
                                                    <Typography variant="body2" color="text.secondary">{item.price} Kyats</Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                            <Button onClick={() => { }} variant="contained">update</Button>
                                            <Button onClick={() => { setDeleteOpen(true); setDeleteId({ ...deleteId, id: item.id }) }} variant="contained" color="error">remove</Button>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Delete
                open={deleteOpen}
                setOpen={() => setDeleteOpen(false)}
                title="Are you sure? You want to delete this? "
                cb={deleteFunction}
                conform="remove"
            />
            <AddShirt open={addShirtOpen} setOpen={() => setAddShirtOpen(false)} />
        </Box>
    )
};
export default UpdateCategory;