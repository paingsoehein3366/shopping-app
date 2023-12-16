import { Box, Dialog, DialogContent, Typography } from "@mui/material"
import FileUpload from "./FileUpload"

interface Prop {
    open: boolean,
    setOpen: () => void
}
const CreatePhoto = ({ open, setOpen }: Prop) => {
    return (
        <Dialog open={open} onClose={setOpen}>
            <DialogContent >
                <Typography sx={{ display: "flex", color: "#138684", justifyContent: "center", mb: 3 }} variant="h6">Photo</Typography>
                <FileUpload />
            </DialogContent>
        </Dialog>
    )
};
export default CreatePhoto;