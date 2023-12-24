import SearchIcon from '@mui/icons-material/Search';
import ShoppinLogo from '../shoppingLogo.png';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Box, Button } from '@mui/material';

const LayoutApp = () => {
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
            <Box sx={{ minWidth: 200, display: "flex", justifyContent: "space-between" }}>
                <AccountCircleRoundedIcon color="success" sx={{ fontSize: 35 }} />
                <FavoriteRoundedIcon sx={{ color: "#fea816", fontSize: 35 }} />
                <LocalMallRoundedIcon sx={{ color: "yellowgreen", fontSize: 35 }} />

            </Box>
        </Box>
    );
};
export default LayoutApp;
