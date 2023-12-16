import { Box, AppBar, Toolbar, IconButton, Typography, Button, Drawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DrawerApp from "./drawerApp";

interface Prop {
    title: String,
}

const LayoutApp = ({ title }: Prop) => {
    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    return (
        <Box>
            <Box sx={{}}>
                <AppBar position="static">
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                        <AccountCircleRoundedIcon />
                    </Toolbar>
                </AppBar>
                <DrawerApp open={open} setOpen={() => setOpen(false)} />
            </Box>
        </Box>
    )
};
export default LayoutApp;