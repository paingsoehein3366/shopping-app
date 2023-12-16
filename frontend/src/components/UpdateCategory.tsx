import { Box, Button, Card, CardActionArea, CardContent, CardMedia, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../config/config";
import LayoutApp from "./LayoutApp";

const UpdateCategory = () => {
    const param = useParams().id;
    const [dataCategory, setDataCategory] = useState([{ id: 0, name: "" }]);
    const [dataShirt, setDataShirt] = useState([{ id: 0, title: "", price: 0, url: "" }]);
    const [dataShirtAndCategory, setDataShirtAndCategory] = useState([{ shirt_categories_id: 0, shirts_id: 0 }]);

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

    return (
        <Box>
            <LayoutApp title="EdtiCategory" />
            <Box>
                <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
                    <Button variant="contained" color="error">Delete</Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box>
                        {checkCategoryId.map(item => {
                            return (
                                <Box sx={{ display: "flex", }}>
                                    <TextField value={item.name} sx={{ mr: 1 }} />
                                    <Button variant="contained">update</Button>
                                </Box>
                            )
                        })}
                    </Box>
                    <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
                        {checkShirts.map(item => {
                            return (
                                <Box>
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
                                        <Button variant="contained">update</Button>
                                        <Button variant="contained" color="error">remove</Button>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};
export default UpdateCategory;