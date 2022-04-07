import React, { useState, useEffect } from "react";
import { Skeleton, Grid, Typography, Fab, Box } from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import { endpoint } from "../../App";

const MyContainer = styled("div")({
  position: "relative",
  paddingBottom: "45%",
  paddingTop: 2,
  borderRadius: 4,
});

const MyIFrame = styled("iframe")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

const VideoPlayer = ({ id }) => {
  let [video, setVideo] = useState(null);
  const [upvotes, setupvotes] = useState(0);
  const [downvotes, setdownvotes] = useState(0);

  const updateViewCount = async (id) => {
    const url = endpoint + `/v1/videos/${id}/views`;
    console.log("Request sent to: " + url);
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 204) {
        throw new Error(response.json());
      }
    } catch (error) {
      console.log(`Error in updating view count ${error.message}`);
    }
  };

  useEffect(() => {
    updateViewCount(id);
  }, []);

  const getVideoDetails = async (id) => {
    try {
      const response = await fetch(`${endpoint}/v1/videos/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonResponse = await response.json();
      setVideo(jsonResponse);
      if (!response.ok) {
        throw new Error(jsonResponse.message);
      }
    } catch (error) {
      console.log(`Video Fetch error: ${error.message}`);
    }
  };

  useEffect(() => {
    getVideoDetails(id);
  }, []);

  const handleVote = (event) => {
    let data;
    if (event === "upvote") {
      data = {
        vote: "upVote",
        change: "increase",
      };
    } else if (event === "downvote") {
      data = {
        vote: "downVote",
        change: "increase",
      };
    }
    const updateVote = async (id) => {
      const url = endpoint + `/v1/videos/${id}/votes`;
      console.log("Request sent to: " + url);
      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.status !== 204) {
          throw new Error(response.json());
        } else {
          if (event === "upvote") {
            setupvotes(upvotes + 1);
          } else if (event === "downvote") {
            setdownvotes(downvotes + 1);
          }
        }
      } catch (e) {
        console.log(`Error in updating votes ${e.message}`);
      }
    };
    updateVote(video._id);
  };
  if (video !== null) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 2 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        >
          <Grid item xs={10}>
            <MyContainer>
              <MyIFrame
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://${video.videoLink}`}
              />
            </MyContainer>
          </Grid>
        </Grid>
        <Grid sx={{ py: 4 }} container justifyContent="space-between">
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <Box sx={{ flexGrow: 1 }} />
          </Grid>
          <Grid item xs={6} sm={8} md={8} lg={8}>
            <Typography
              variant="h5"
              noWrap
              align="left"
              color="white"
              sx={{ fontWeight: "bold" }}
            >
              {video.title}
            </Typography>
            <Typography
              sx={{ pt: 1 }}
              variant="body2"
              align="left"
              color="white"
            >
              {`${video.contentRating} • ${video.releaseDate}`}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={2} md={1} lg={2}>
            <Fab
              variant="extended"
              size="medium"
              color="white"
              sx={{ mr: 1 }}
              value="upVote"
              onClick={() => handleVote("upvote")}
            >
              <ThumbUp sx={{ mr: 1 }} />
              {upvotes}
            </Fab>
            <Fab
              variant="extended"
              size="medium"
              color="white"
              onClick={() => handleVote("downvote")}
            >
              <ThumbDown sx={{ mr: 1 }} />
              {downvotes}
            </Fab>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={0.5}>
            <Box sx={{ flexGrow: 1 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ pt: 2 }}
      columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
    >
      <Grid item xs={12} sx={{ height: 700, aspectRatio: 16 / 9 }}>
        <Skeleton height="90%" variant="rectangular" />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default VideoPlayer;
