import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import LayoutApp from "./LayoutApp";
import AddIcon from "@mui/icons-material/Add";
import CreateCategory from "./CreateCategory";
import { config } from "../config/config";
import { Link } from "react-router-dom";
import Delete from "./Delete";

const TshirtCategories = () => {
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState<String>();
    const [data, setData] = useState([{ id: "", name: "" }]);
    console.log("data: ", data);

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
            return alert("!Error...")
        }
    };
    const deletefunction = async () => {
        if (!deleteCategoryId) return alert("Try again");
        const response = await fetch(`${config.apiBaseUrl}/deleteCategory`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ deleteCategoryId })
        });
        if (response.ok) {
            setDeleteOpen(false);
        } else {
            alert("Try again")
            setDeleteOpen(false);
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
                                <Box key={item.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Box sx={{
                                        border: "1px solid gray",
                                        borderRadius: 2,
                                        m: 2,
                                        minWidth: 200,
                                        minHeight: 120,
                                        bgcolor: "#f5f3f0",
                                        "&&:hover": { minWidth: 210, minHeight: 130, cursor: "pointer", transition: "0.6s", bgcolor: "#ffffff" },
                                        transition: "0.6s",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                padding: 10,
                                                fontFamily: "sans-serif",
                                                fontSize: 25,
                                                borderRadius: 10,
                                            }}
                                            to={`/updateCategory/${item.id}`}
                                        >{item.name}</Link>
                                    </Box>
                                    <Button onClick={() => { setDeleteOpen(true); setDeleteCategoryId(item.id) }} sx={{ mt: "1px" }} variant="contained" color="error">Delete</Button>
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
            <CreateCategory open={open} setOpen={() => setOpen(false)} />
            <Delete
                open={deleteOpen}
                setOpen={() => setDeleteOpen(false)}
                title="Are you sure this table delete?"
                cb={deletefunction}
                conform="delete"
            />
        </Box>
    )
};
export default TshirtCategories;