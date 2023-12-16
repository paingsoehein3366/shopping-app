import { Box, Drawer, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import RedeemRoundedIcon from '@mui/icons-material/RedeemRounded';

interface Prop {
    open: boolean,
    setOpen: () => void
}

const DrawerApp = ({ open, setOpen }: Prop) => {
    const Style = {
        textDecoration: "none",
        margin: 10,
        color: "black",
        width: 150,
        display: "flex"
    };
    const iconStyle = {
        color: "gray",
        mr: 1
    }
    return (
        <Box>
            <Drawer open={open} onClose={setOpen} anchor="left">
                <Box>
                    <CloseRoundedIcon sx={{
                        m: 2,
                        color: "",
                        fontSize: 35,
                        cursor: "pointer",
                        transition: "1s",
                        "&&:hover": { borderRadius: 10, fontSize: 40 },
                        borderRadius: 10,
                    }} onClick={setOpen} />
                    <Box sx={{ minWidth: 200, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box>
                            <Link style={Style} to={"/"}>
                                <HomeRoundedIcon sx={iconStyle} />
                                <Typography>Home</Typography>
                            </Link>
                        </Box>
                        <Box>
                            <Link style={Style} to={"/shirt"}>
                                <LocalMallRoundedIcon sx={iconStyle} />
                                <Typography>Tshirt</Typography>
                            </Link>
                        </Box>
                        <Box>
                            <Link style={Style} to={"/shirtCategory"}>
                                <RedeemRoundedIcon sx={iconStyle} />
                                <Typography>TshirtCategories</Typography>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    )
}
export default DrawerApp;
