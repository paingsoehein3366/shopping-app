import { Box, Button, Checkbox, Dialog, DialogContent, DialogContentText, FormControl, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { config } from "../config/config";
interface Prop {
    open: boolean,
    setOpen: () => void,
    id: number
}

const CreateShirt = ({ open, setOpen, id }: Prop) => {
    const [Shirt, setShirt] = useState({ ShirtName: "", ShirtPrice: 0 });
    const [data, setData] = useState([{ id: "", name: "" }]);
    const [category, setCategory] = useState<string[]>([]);

    console.log("createId: ", id);

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
    }

    const addFunction = async () => {
        if (!Shirt.ShirtName) {
            return alert("Enter title");
        } else if (!Shirt.ShirtPrice) {
            return alert("Enter price");
        } else if (!category.length) {
            return alert("Enter cagegory");
        }

        const response = await fetch(`${config.apiBaseUrl}/createShirt`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ price: Shirt.ShirtPrice, name: Shirt.ShirtName, category, id }),
        });
        if (response.ok) {
            setOpen();
        } else {
            setOpen();
            return alert("Try again!")
        }
    };

    const handleChange = (event: SelectChangeEvent<typeof category>) => {
        const {
            target: { value },
        } = event;
        setCategory(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <Dialog open={open} onClose={setOpen}>
            <DialogContent sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
                <DialogContentText sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ m: 3, color: "#138684" }} variant="h5">Create Shirt</Typography>
                    <Box sx={{ marginY: 2 }}>
                        <Typography sx={{ display: "flex", color: "#138684" }} variant="h6">Title</Typography>
                        <TextField
                            value={Shirt.ShirtName}
                            sx={{ minWidth: 300 }}
                            onChange={(evt) => setShirt({ ...Shirt, ShirtName: evt.target.value })}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ display: "flex", color: "#138684" }} variant="h6">Price</Typography>
                        <TextField
                            value={Shirt.ShirtPrice}
                            sx={{ minWidth: 300 }}
                            onChange={(evt) => setShirt({ ...Shirt, ShirtPrice: Number(evt.target.value) })}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ display: "flex", color: "#138684" }} variant="h6">Categories</Typography>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                                id="demo-multiple-checkbox"
                                multiple
                                value={category}
                                onChange={handleChange}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {data.map((item) => (
                                    <MenuItem key={item.id} value={item.name}>
                                        <Checkbox checked={category.indexOf(item.name) > -1} />
                                        <ListItemText primary={item.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button sx={{ minWidth: 300, mb: 2 }} variant="contained" color="success" onClick={addFunction}>add</Button>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
};
export default CreateShirt;