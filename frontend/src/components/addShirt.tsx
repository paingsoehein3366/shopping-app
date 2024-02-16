import { Box, Button, Dialog, DialogContent, TextField } from "@mui/material";
import { useState } from "react";
import { config } from "../config/config";
import FileUpload from "./FileUpload";

interface Prop {
      open: boolean;
      setOpen: () => void;
}

const AddShirt = ({ open, setOpen }: Prop) => {
      const [data, setData] = useState({ name: "", price: "" });
      const [photo, setPhoto] = useState();
      const [fileOpen, setFileOpen] = useState(false);
      const addFunction = async () => {
            if (!data.name) {
                  return alert("Enter name");
            } else if (!data.price) {
                  return alert("Enter price");
            };
            const response = await fetch(`${config.apiBaseUrl}/addShirt`, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ data }),
            })
      }
      return (
            <Dialog open={open} onClose={setOpen}>
                  <DialogContent sx={{ display: "flex", flexDirection: "column", p: 2, minWidth: 400, justifyContent: "center", alignItems: "center" }}>
                        <Button sx={{}} variant="contained" color="success" onClick={() => setFileOpen(true)}>&#65291; photo</Button>
                        <FileUpload open={fileOpen} setOpen={() => setFileOpen(false)} />
                        <TextField sx={{ marginY: 2, minWidth: 300 }} onChange={(evt) => setData({ ...data, name: evt.target.value })} placeholder="name" />
                        <TextField sx={{ mb: 2, minWidth: 300 }} onChange={(evt) => setData({ ...data, price: evt.target.value })} placeholder="price" />
                        <Button onClick={addFunction} variant="contained">add</Button>
                  </DialogContent>
            </Dialog>
      )
};
export default AddShirt;