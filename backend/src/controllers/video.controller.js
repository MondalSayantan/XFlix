const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");
const logger = require("../config/logger");
const httpStatus = require("http-status");

const getVideos = catchAsync(async (req, res) => {
  const reqQuery = req.query;
  if (Object.keys(reqQuery).length !== 0) {
    await videoService.getVideosByQueries(reqQuery).then((value) => {
      res.status(200).send({videos: value});
      logger.info("Request received on /v1/videos with filter queries");
    });
  } else {
    await videoService.getAllVideos().then((value) => {
      logger.info("Request received on /v1/videos/");
      res.status(200).send({videos: value});
    });
  }
});

const getVideoByID = catchAsync(async (req, res) => {
  await videoService.findVideo(req.params.videoID).then((video) =>{
    if(video) res.status(200).send(video);
    else {
      res.status(404).send("No video found with matching id");
    }
});
});

const insertVideo = catchAsync(async (req, res) => {
  const video = await videoService.addVideo(req.body);
  return res.status(httpStatus.CREATED).send(video);
});

const updateVotes = catchAsync(async (req, res) => {
  await videoService
    .changeVotes(req.params.videoId, req.body)
    .then((video) => {
      if (video) {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(404).send("No video found with matching id");
    });
});

const updateViews = catchAsync(async (req, res) => {
  await videoService
    .changeViews(req.params.videoId)
    .then((video) => {
      if (video) {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

module.exports = { getVideos, getVideoByID, insertVideo, updateVotes, updateViews };
