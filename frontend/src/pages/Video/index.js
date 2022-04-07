import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer";
import MyGrid from "../../components/MyGrid";
import { Divider } from "@mui/material";
import { endpoint } from "../../App";
import Header from "../../components/Header";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const { videoId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const performApiCall = async () => {
    setIsLoading(true);
    const url = endpoint + `/v1/videos`;
    console.log("Request sent to: " + url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setVideos(data.videos);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    performApiCall();
  }, []);

  return (
    <div>
      <Header isAtHome={false} />
      <VideoPlayer id={videoId} />
      <Divider sx={{ ml: 20, mr: 20 }} color="white" />
      <MyGrid videos={videos} isLoading={isLoading} />
    </div>
  );
};

export default Video;
