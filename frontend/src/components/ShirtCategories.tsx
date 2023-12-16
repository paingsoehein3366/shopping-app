import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import LayoutApp from "./LayoutApp";
import AddIcon from "@mui/icons-material/Add";
import CreateCategory from "./CreateCategory";
import { config } from "../config/config";
import { Link } from "react-router-dom";

const TshirtCategories = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([{ id: "", name: "" }]);
    console.log("data: ", data);

    useEffect(() => {
        dataFromCategory();
    }, [1])
    const dataFromCategory = async () => {
        const response = await fetch(`${config.apiBaseUrl}/category`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        });
        if (response.ok) {
            const responseJson = await response.json();
            setData(responseJson);
        } else {
            return alert("!Error...")
        }
    }
    return (
        <Box>
            <LayoutApp title="Shirt Categories" />
            <Box>
                <Box sx={{ display: "flex", justifyContent: "end", mt: 2, mr: 2 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => setOpen(true)}
                        startIcon={<AddIcon />}
                    >Create Categories</Button>
                </Box>
                <Box>
                    <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                        {data.map(item => {
                            return (
                                <Box key={item.id} sx={{ display: "flex", borderRadius: 2, m: 2, "&&:hover": { bgcolor: "#d3d2cf", cursor: "pointer", transition: "1s" } }}>
                                    <Link
                                        style={{
                                            textDecoration: "none",
                                            padding: 40,
                                            color: "black",
                                            fontFamily: "sans-serif",
                                            fontSize: 25,
                                            border: "1px solid gray",
                                            borderRadius: 10,
                                        }}
                                        to={`/updateCategory/${item.id}`}
                                    >{item.name}</Link>
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
            <CreateCategory open={open} setOpen={() => setOpen(false)} />
        </Box>
    )
};
export default TshirtCategories;