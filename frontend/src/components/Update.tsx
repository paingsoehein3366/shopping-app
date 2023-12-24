import { Box, Button, Dialog, DialogContent, DialogContentText, TextField } from "@mui/material";

interface Prop {
    open: boolean,
    setOpen: () => void,
    cb: () => void,
}

const Update = ({ open, setOpen, cb }: Prop) => {
    return (
        <Dialog open={open} onClose={setOpen}>
            <DialogContentText sx={{ display: "flex", flexDirection: "column", p: 2 }}>
                <DialogContent sx={{ fontSize: 20, display: "flex", justifyContent: "center" }}>Update</DialogContent>
                <TextField />
                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
                    <Button variant="outlined" onClick={setOpen}>cencle</Button>
                    <Button onClick={cb} variant="contained" color="error">update</Button>
                </Box>
            </DialogContentText>
        </Dialog>
    )
};
export default Update;