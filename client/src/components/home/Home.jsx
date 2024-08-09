import { Box, Grid, Typography } from "@mui/material";

//components
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./post/Posts";

const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} xs={12} sm={2}>
          <Categories />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          <Posts />
        </Grid>
      </Grid>
      <Box
        className="footer"
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#333",
          color: "#fff",
          marginTop: "40px",

          position: "fixed",
          width: "100%",
          height:"10px",
          bottom: 0,
        }}
      >
        <Typography variant="body2">
          All rights reserved &copy; Abhay Yadav
        </Typography>
      </Box>
    </>
  );
};

export default Home;
