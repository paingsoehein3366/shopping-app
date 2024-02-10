import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const WebIntroApp = () => {
      const [counter, setCounter] = useState({ value: 0 });
      const image1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGrdd5F7mas4H9uf1iE-dCIJTrGlvxim7jfA&usqp=CAU"
      const image2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwxpx0FofHpI1DkWGnrLadvu3FsWwcIxlfZw&usqp=CAU"
      const [image, setImage] = useState({ url: image1 });
      const Array = [image1, image2];
      let Number = counter.value;
      console.log("Number: ", Number);

      const lastFunction = () => {
            if (Number > 0) return;
            Number += 1;
            setCounter({ ...counter, value: Number });
            for (let i = 0; i < Array.length; i++) {
                  const element = Array[Number];
                  setImage({ url: element });
            }
      };

      const nextFunction = () => {
            if (Number < (Array.length - 1)) return;
            Number -= 1;
            console.log("Number Last: ", Number);
            setCounter({ ...counter, value: Number });
            for (let i = 0; i < Array.length; i++) {
                  const element = Array[Number];
                  setImage({ url: element });
            }
      };

      return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minWidth: 500 }}>
                        <Typography onClick={nextFunction} variant="h4" sx={{ fontFamily: "sans-serif", "&&:hover": { color: "gray" }, cursor: "pointer", userSelect: "none" }}>&lt;</Typography>
                        <Box sx={{ width: "100%", mt: 3 }}>
                              <img style={{ width: "95%", borderRadius: 10 }} src={image.url} alt="" />
                        </Box>
                        <Typography onClick={lastFunction} variant="h4" sx={{ fontFamily: "sans-serif", "&&:hover": { color: "gray" }, cursor: "pointer", userSelect: "none" }}>&gt;</Typography>
                  </Box>
            </Box>
      )
};
export default WebIntroApp;