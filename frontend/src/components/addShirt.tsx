import { Box, Button, Dialog, DialogContent, TextField } from "@mui/material";
import { useState } from "react";

interface Prop {
      open: boolean;
      setOpen: () => void;
}

const AddShirt = ({ open, setOpen }: Prop) => {
      const [data, setData] = useState({ name: "", price: "" });
      const [photo, setPhoto] = useState()
      return (
            <Dialog open={open} onClose={setOpen}>
                  <DialogContent sx={{ display: "flex", flexDirection: "column", p: 2, minWidth: 400, justifyContent: "center", alignItems: "center" }}>
                        <TextField onChange={(evt) => { }} sx={{ width: 300, mt: 3 }} type="file" />
                        <TextField sx={{ marginY: 2, minWidth: 300 }} onChange={(evt) => setData({ ...data, name: evt.target.value })} placeholder="name" />
                        <TextField sx={{ mb: 2, minWidth: 300 }} onChange={(evt) => setData({ ...data, price: evt.target.value })} placeholder="price" />
                        <Button variant="contained">add</Button>
                  </DialogContent>
            </Dialog>
      )
};
export default AddShirt;