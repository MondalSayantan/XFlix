import React, { useState } from "react";
import Axios from "axios";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from "@mui/material";
import AdapterDateFns from "@date-io/date-fns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { useSnackbar } from "notistack";

import { endpoint } from "../../App";

const UploadForm = ({ visibility, setVisibility }) => {
  const ageOptions = [
    { label: "7+", key: 1 },
    { label: "12+", key: 2 },
    { label: "16+", key: 3 },
    { label: "18+", key: 4 },
  ];

  const genreOptions = [
    { label: "Education", key: 1 },
    { label: "Sports", key: 2 },
    { label: "Comedy", key: 3 },
    { label: "Lifestyle", key: 4 },
    { label: "Movies", key: 5 },
  ];

  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [dateValue, setDateValue] = useState(new Date());
  const [genre, setGenre] = useState("");
  const [contentRating, setContentRating] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  // method to toggle visibility of form
  const handleClickSubmit = () => {
    const uploadVideo = async (data) => {
      try {
        const response = await Axios.post(`${endpoint}/v1/videos`, data);
        console.log(response);
        if (response.status !== 201) {
          throw new Error("Upload failed");
        }
        enqueueSnackbar("Video Upload Successful", { variant: "success" });
        // reload the page
        window.location.reload();
      } catch (error) {
        console.log(`Error in video upload: ${error.message}`);
        enqueueSnackbar("Video Upload Failed", { variant: "error" });
      } finally {
        setOpen(true);
      }
    };

    const data = {
      videoLink: link,
      title: title,
      genre: genre,
      contentRating: contentRating,
      releaseDate: dateValue,
      previewImage: thumbnail,
    };
    uploadVideo(data);
  };

  // method to submit the form
  const handleClose = () => {
    setVisibility(false);
  };

  return (
    <>
      <Dialog
        components="form"
        autoComplete="off"
        open={visibility}
        onClose={handleClose}
      >
        <form noValidate autoComplete="off">
          <DialogTitle>Upload Video</DialogTitle>
          <DialogContent>
            {/* Video Link */}
            <TextField
              sx={{ mt: 1 }}
              id="video-link"
              label="Video Link"
              type="url"
              fullWidth
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />

            {/* Thumbnail */}
            <TextField
              sx={{ mt: 2.5 }}
              id="thumbnail"
              label="Preview Image Link"
              type="url"
              fullWidth
              onChange={(e) => {
                setThumbnail(e.target.value);
              }}
            />

            {/* Title */}
            <TextField
              sx={{ mt: 2.5 }}
              id="title"
              label="Title"
              type="text"
              fullWidth
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            {/* Genre */}
            <FormControl sx={{ mt: 2.5 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Genre
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={genre}
                label="Age"
                onChange={(event) => {
                  setGenre(event.target.value);
                }}
              >
                {genreOptions.map((option) => {
                  return (
                    <MenuItem value={option.label} key={option.label}>
                      {option.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* Content Rating */}
            <FormControl sx={{ mt: 2.5 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Content Rating
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={contentRating}
                label="Genre"
                onChange={(event) => {
                  setContentRating(event.target.value);
                }}
              >
                {ageOptions.map((option) => {
                  return (
                    <MenuItem value={option.label} key={option.label}>
                      {option.label}{" "}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* Date picker */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Release Date"
                inputFormat="MM/dd/yyyy"
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth sx={{ mt: 2.5 }} />
                )}
              />
            </LocalizationProvider>
          </DialogContent>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ pl: 3, pb: 3 }}
          >
            <Button
              color="error"
              variant="contained"
              onClick={handleClickSubmit}
              id={"upload-btn-submit"}
            >
              Submit
            </Button>
            <Button
              sx={{ pl: 3 }}
              onClick={handleClose}
              id={"upload-btn-cancel"}
            >
              Cancel
            </Button>
          </Grid>
        </form>
      </Dialog>
    </>
  );
};

export default UploadForm;
