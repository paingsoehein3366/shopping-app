import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config";
import CategoriesApp from "./categoriesApp";
import LayoutApp from "./layoutApp";
import HomeIcon from '@mui/icons-material/Home';


const ChangeCategory = () => {
      const param = useParams().id;
      const navigate = useNavigate();
      const [data, setData] = useState([{ id: "", name: "" }]);
      const [dataShirtAndCategory, setDataShirtAndCategory] = useState([{ shirt_categories_id: 0, shirts_id: 0 }]);
      const [shirtData, setShirtData] = useState([{ id: 0, title: "", price: 0, url: "" }]);

      useEffect(() => {
            dataFromCategory();
            getShirtData();
            shirtsAndShirtCategory();
      }, [1]);
      const getShirtData = async () => {
            const response = await fetch(`${config.apiBaseUrl}/shirt`, {
                  method: "GET",
                  headers: { "content-type": "application/json" },
            });
            if (response.ok) {
                  const responseJson = await response.json();
                  setShirtData(responseJson);
            } else {
                  return alert("Error!")
            }
      };
      const dataFromCategory = async () => {
            const response = await fetch(`${config.apiBaseUrl}/category`, {
                  method: "GET",
                  headers: { "content-type": "application/json" },
            });
            if (response.ok) {
                  const responseJson = await response.json();
                  setData(responseJson);
            } else {
                  return alert("!Error...")
            }
      };
      const shirtsAndShirtCategory = async () => {
            const response = await fetch(`${config.apiBaseUrl}/getShirtCategory`, {
                  method: "GET",
                  headers: { "content-type": "application/json" }
            });
            if (response.ok) {
                  const responseJson = await response.json();
                  setDataShirtAndCategory(responseJson);
            } else {
                  return alert("Error!");
            }
      };
      const checkShirtId = dataShirtAndCategory.filter(item => item.shirt_categories_id === Number(param)).map(item => item.shirts_id);
      const checkShirts = shirtData.filter(item => checkShirtId.includes(item.id));

      return (
            <Box>
                  <LayoutApp />
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography color="#626060" variant="h6" sx={{ mt: 3, p: 1, }} onClick={() => navigate("/")}>
                              <HomeIcon sx={{ "&&:hover": { color: "blue" } }} />
                        </Typography>
                        <CategoriesApp />
                  </Box>
                  <Box sx={{ display: "flex", m: 1, flexWrap: "wrap", width: "100%" }}>
                        {checkShirts.map(item => {
                              return (
                                    <Box key={item.id} sx={{ display: "flex", flexDirection: "column", m: 2 }}>
                                          <Card sx={{ width: { xs: 150, md: 240 }, }}>
                                                <CardActionArea>
                                                      <CardMedia
                                                            component="img"
                                                            height="220"
                                                            image={`${config.apiBaseUrl}/images/${item.url}`}
                                                            alt="green iguana"
                                                      />
                                                      <CardContent>
                                                            <Typography gutterBottom variant="h6" component="div">{item.title}</Typography>
                                                            <Typography variant="body2" color="text.secondary">{item.price} Kyats</Typography>
                                                      </CardContent>
                                                </CardActionArea>
                                          </Card>
                                    </Box>
                              )
                        })}
                  </Box>
            </Box>
      )
};
export default ChangeCategory;