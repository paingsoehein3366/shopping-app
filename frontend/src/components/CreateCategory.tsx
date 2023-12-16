import { Box, Button, Dialog, DialogContentText, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { config } from "../config/config";
interface Prop {
    open: boolean,
    setOpen: () => void,
}
const CreateCategory = ({ open, setOpen }: Prop) => {
    const [name, setName] = useState({ name: "" });

    const AddCategory = async () => {
        if (!name.name) return alert("Enter name");
        const response = await fetch(`${config.apiBaseUrl}/createCategory`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name: name.name })
        });
        if (response.ok) {
            setOpen();
        } else {
            setOpen();
            return alert("Error...");
        }
    };
    return (
        <Dialog open={open} onClose={setOpen}>
            <DialogContentText sx={{ minWidth: 200, display: "flex", flexDirection: "column", alignItems: "center", paddingY: 3 }}>
                <Typography variant="h5">Create Category</Typography>
                <TextField
                    onChange={(evt) => setName({ ...name, name: evt.target.value })}
                    sx={{ minWidth: 250, marginY: 3 }}
                    placeholder="Name"
                />
                <Box sx={{ display: "flex", minWidth: 400, justifyContent: "space-around" }}>
                    <Button onClick={setOpen} variant="outlined">cancel</Button>
                    <Button onClick={AddCategory} variant="contained" color="success">add</Button>
                </Box>
            </DialogContentText>
        </Dialog>
    )
};
export default CreateCategory;