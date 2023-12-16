import { useState } from "react";
import axios from "axios";
import { config } from "../config/config";
import { Button, TextField } from "@mui/material";

const FileUpload = () => {
    const [file, setFile] = useState();
    const upload = () => {
        if (!file) return alert("Enter photo")
        const formData = new FormData();
        formData.append("file", file);
        axios.post(`${config.apiBaseUrl}/upload`, formData)
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log("Success");
                    alert("Sucess")
                } else {
                    alert("Error!");
                }
            });
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <TextField sx={{ width: 300, mb: 2 }} type="file" onChange={(evt) => setFile(evt.target.files[0])} />
            <Button onClick={upload} variant="outlined">post</Button>
        </div>
    )
};
export default FileUpload;