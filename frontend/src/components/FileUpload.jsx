import { useState } from "react";
import axios from "axios";
import { config } from "../config/config";
import { Button, TextField,Dialog, DialogContent,Typography } from "@mui/material";

const FileUpload = ({ open, setOpen}) => {
    const [file, setFile] = useState();
    console.log("open: ",open);
    const upload = () => {
        if (!file) return alert("Enter photo")
        const formData = new FormData();
        formData.append("file", file);
        axios.post(`${config.apiBaseUrl}/upload`, formData)
            .then(res => {
                if (res.data.Status === "Success") {
                    setOpen(false);
                } else {
                    alert("Error!");
                }
            });
    }
    return (
         <Dialog open={open} onClose={setOpen}>
            <DialogContent >
                <Typography sx={{ display: "flex", color: "#138684", justifyContent: "center", mb: 3 }} variant="h6">Photo</Typography>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <TextField sx={{ width: 300, mb: 2 }} type="file" onChange={(evt) => setFile(evt.target.files[0])} />
                    <Button onClick={upload} variant="outlined">post</Button>
                </div>
            </DialogContent>
        </Dialog>
        
    )
};
export default FileUpload;