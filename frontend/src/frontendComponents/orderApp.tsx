import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { config } from "../config/config";
import CategoriesApp from "./categoriesApp";
import LayoutApp from "./layoutApp";
import HomeIcon from '@mui/icons-material/Home';
import WebIntroApp from "./webIntroApp";
import BuyApp from "./buyApp";

const OrderApp = () => {
    const [data, setData] = useState([{ id: 0, title: "", price: 0, url: "" }]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(Number || undefined);
    useEffect(() => {
        home();
    }, [1])
    const home = async () => {
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
            <Box>
                <LayoutApp />
                <WebIntroApp />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography color="#626060" variant="h6" sx={{ mt: 3, p: 1, }} onClick={home}>
                        <HomeIcon sx={{ "&&:hover": { color: "blue", borderBottom: "1px solid" } }} />
                    </Typography>
                    <CategoriesApp />
                </Box>
                <Box sx={{ display: "flex", m: 1, flexWrap: "wrap", width: "100%", }}>
                    {data.map(item => {
                        return (
                            <Box key={item.id}>
                                <Card onClick={() => { setOpen(true); setId(item.id) }} sx={{ display: "flex", width: 200, height: 300, m: 1, "&&:hover": { width: 220, height: 310, transition: "1s" }, transition: "1s" }}>
                                    <CardActionArea sx={{ display: "flex", flexDirection: "column", }}>
                                        <CardMedia
                                            sx={{ width: 200, height: 200 }}
                                            component="img"
                                            image={`${config.apiBaseUrl}/images/${item.url}`}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography >{item.title}</Typography>
                                            <Typography color="text.secondary">{item.price}Kyats</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
            <BuyApp open={open} setOpen={() => setOpen(false)} id={id} />
        </Box>
    )
};
export default OrderApp;