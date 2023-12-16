import { Box, Button, Drawer, TextField, Typography } from "@mui/material"
import { useState } from "react";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const LoginApp = () => {
    const [userName, setUserName] = useState({ userName: "" });
    const [password, setPassword] = useState({ password: "" });
    const [loadingOpen, setLoadingOpen] = useState(false);

    const backOffice = async () => {
        const isValid = userName.userName && password.password;
        if (!isValid) return alert("Write userName and password");

    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100vh" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ fontFamily: "monospace", color: "#1876d2" }} variant="h5">Login page</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                <TextField
                    type="text"
                    label="User Name"
                    onChange={(evt) => setUserName({ ...userName, userName: evt.target.value })}
                    placeholder="User Name"
                    value={userName.userName}
                />
                <TextField
                    sx={{ marginY: 2 }}
                    type="password"
                    label="Password"
                    onChange={(evt) => setPassword({ ...password, password: evt.target.value })}
                    placeholder="Password"
                    value={password.password}
                />
                <Button onClick={backOffice} sx={{ mb: 5 }} variant="contained">Log in</Button>
            </Box>
            <Box></Box>
            <Box></Box>
        </Box>

    )
};
export default LoginApp;