import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config/config";

const CategoriesApp = () => {
    const [data, setData] = useState([{ id: "", name: "" }]);
    const navigator = useNavigate();

    useEffect(() => {
        dataFromCategory();
    }, [1]);
    const dataFromCategory = async () => {
        const response = await fetch(`${config.apiBaseUrl}/category`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        });
        if (response.ok) {
            const responseJson = await response.json();
            setData(responseJson);
        } else {
            return alert("!Error...");
        }
    };
    return (
        <Box>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    {data.map(item => {
                        return (
                            <Link
                                onClick={() => navigator("/")}
                                to={`changeCategories/${item.id}`}
                                key={item.id}
                                style={{ display: "flex", textDecoration: "none" }}
                            >
                                <Typography sx={{ marginX: 1, paddingX: 1, borderLeft: "1px solid", "&&:hover": { color: "blue" } }} color="#626060" variant="h6">{item.name}</Typography>
                            </Link>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
};
export default CategoriesApp;
