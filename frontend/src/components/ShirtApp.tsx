import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LayoutApp from "./LayoutApp";
import AddIcon from "@mui/icons-material/Add";
import CreateShirt from "./CreateShirt";
import { config } from "../config/config";
import CreatePhoto from "./CreatePhoto";

const ShirtApp = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([{ id: 0, title: "", price: 0, url: "" }]);
    const [createShirtOpen, setCreateShirtOpen] = useState(false);
    const [id, setId] = useState({ id: 0 });
    console.log("id: ", id);

    useEffect(() => {
        getShirtData();
    }, [1]);
    const getShirtData = async () => {
        const response = await fetch(`${config.apiBaseUrl}/shirt`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        });
        if (response.ok) {
            const responseJson = await response.json();
            setData(responseJson);
        } else {
            return alert("Error!")
        }
    };
    return (
        <Box>
            <LayoutApp title="Tshirt" />
            <Box>
                <Box sx={{ display: "flex", justifyContent: "end", mt: 2, mr: 2 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => setOpen(true)}
                        startIcon={<AddIcon />}
                    >Photo</Button>
                </Box>
                <Box sx={{}}>
                    <Box sx={{ display: "flex", m: 1, flexWrap: "wrap", width: "100%" }}>
                        {data.map(item => {
                            return (
                                <Box key={item.id} sx={{ display: "flex", flexDirection: "column", m: 2 }}>
                                    <Card sx={{ width: { xs: 150, md: 240 }, }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="220"
                                                image={`${config.apiBaseUrl}/images/${item.url}`}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div">{item.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">{item.price} Kyats</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                    <Button variant="outlined" onClick={() => {
                                        setId({ ...id, id: item.id });
                                        setCreateShirtOpen(true);
                                    }}>add</Button>
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
            <CreatePhoto open={open} setOpen={() => setOpen(false)} />
            <CreateShirt open={createShirtOpen} setOpen={() => setCreateShirtOpen(false)} id={id.id} />
        </Box>
    )
};
export default ShirtApp;