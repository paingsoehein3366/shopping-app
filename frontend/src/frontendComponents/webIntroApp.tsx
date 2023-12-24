import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import introImage from "../banner-25.jpg";

const WebIntroApp = () => {
      const nextFunction = () => {

      };
      const lastFunction = () => {

      }
      return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography onClick={nextFunction} variant="h4" sx={{ fontFamily: "sans-serif", "&&:hover": { color: "gray" }, cursor: "pointer" }}>＜</Typography>
                        <Box sx={{ width: "70%", mt: 3 }}>
                              <img style={{ width: "95%", borderRadius: 10 }} src={introImage} alt="" />
                        </Box>
                        <Typography onClick={lastFunction} variant="h4" sx={{ fontFamily: "sans-serif", "&&:hover": { color: "gray" }, cursor: "pointer" }}>＞</Typography>
                  </Box>
            </Box>
      )
};
export default WebIntroApp;