import { Box, Button, Dialog, DialogContent, DialogContentText, TextField } from "@mui/material";

interface Prop {
    open: boolean,
    setOpen: () => void,
    title: String,
    cb: () => void,
    conform: String
}

const Delete = ({ open, setOpen, title, cb, conform }: Prop) => {
    return (
        <Dialog open={open} onClose={setOpen}>
            <DialogContentText sx={{ display: "flex", flexDirection: "column", p: 3 }}>
                <DialogContent sx={{ fontSize: 20 }}>{title}</DialogContent>
                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
                    <Button variant="outlined" onClick={setOpen}>cencle</Button>
                    <Button onClick={cb} variant="contained" color="error">{conform}</Button>
                </Box>
            </DialogContentText>
        </Dialog>
    )
};
export default Delete;