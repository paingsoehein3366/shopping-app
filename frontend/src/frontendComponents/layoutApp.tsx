import SearchIcon from '@mui/icons-material/Search';
import ShoppinLogo from '../shoppingLogo.png';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Box, Button } from '@mui/material';
import LoginApp from './loginApp';
import OrderList from './orderListApp';
import { useState } from 'react';

const LayoutApp = () => {
    const [open, setOpen] = useState(false);
    const [openOrderList, setOpenOrderList] = useState(false);
    const buyList = () => {
        setOpenOrderList(true);
    }

    return (
        <Box sx={{ position: "sticky", top: 0, bgcolor: "#fafafa", borderBottom: "0.5px solid gray", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <Box sx={{ width: 150, height: 120, display: "flex" }}>
                <img style={{ width: "100%", }} src={ShoppinLogo} alt="" />
            </Box>
            <Box>
                <input
                    style={{
                        minWidth: 400,
                        minHeight: 45,
                        padding: 11,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        border: "1px solid skyblue",
                    }}
                    type="search"
                    placeholder="search products name ......."
                />
                <Button sx={{
                    p: 1.2,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    border: "1px solid skyblue",
                    borderLeft: "none",
                    position: "relative",
                    right: 3,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                }}>
                    <SearchIcon />
                </Button>

            </Box>
            <Box sx={{ minWidth: 200, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <AccountCircleRoundedIcon onClick={() => setOpen(true)} color="success" sx={{ fontSize: 35, cursor: "pointer", "&&:active": { opacity: 0.5 } }} />
                <FavoriteRoundedIcon sx={{ color: "#fea816", fontSize: 35 }} />
                <Box>
                    <p style={{ color: "#fea816", position: "relative", left: 20, border: "1px solid", display: "flex", justifyContent: "center", borderRadius: 50, width: 15, height: 20 }}>2</p>
                    <LocalMallRoundedIcon onClick={buyList} sx={{ color: "yellowgreen", fontSize: 35, position: "relative", bottom: 27, cursor: "pointer", "&&:active": { opacity: 0.5 } }} />
                </Box>
            </Box>
            <LoginApp open={open} setOpen={() => setOpen(false)} />
            <OrderList open={openOrderList} setOpen={() => setOpenOrderList(false)} />
        </Box>
    );
};
export default LayoutApp;
