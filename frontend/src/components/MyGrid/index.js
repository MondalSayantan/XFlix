import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { Link } from "react-router-dom";
import VideoCard from "../VideoCard";

const MyGrid = ({ videos, isLoading }) => {
  if (isLoading) {
    return (
      <Box sx={{ height: 400 }}>
        <Grid
          height="100%"
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <CircularProgress />
          </Grid>
          <Grid item>Loading Videos</Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <div className="app">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 4 }}
          rowSpacing={{ xs: 1, sm: 2, md: 5 }}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        >
          {videos.length > 0 ? (
            videos.map((video) => {
              return (
                <Grid item xs={11} sm={5} md={5} lg={2.5} key={video._id}>
                  <Link
                    to={`/video/${video._id}`}
                    style={{ textDecoration: "none", color: "white" }}
                    className="video-tile-link"
                  >
                    <VideoCard video={video} />
                  </Link>
                </Grid>
              );
            })
          ) : (
            <div className="no-videos">
              <p>No videos found.</p>
            </div>
          )}
        </Grid>
      </div>
    );
  }
};

export default MyGrid;
