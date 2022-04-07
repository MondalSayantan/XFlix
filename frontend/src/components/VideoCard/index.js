import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import moment from "moment";

const VideoCard = ({ video }) => {

  return (
    <Card
      elevation={0}
      key={video._id}
      className="video-tile"
    >
      <CardMedia
        component="img"
        alt={video.title}
        height="150"
        image={video.previewImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {video.title}
        </Typography>
        <Typography variant="body1">
          {moment(video.releaseDate).fromNow()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
