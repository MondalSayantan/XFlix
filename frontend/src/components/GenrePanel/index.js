import { Box, TextField, MenuItem, Grid, AppBar, Toolbar } from "@mui/material";
import React from "react";
import "./GenrePanel.styles.css";

const GenrePanel = ({
  allGenres,
  selectedGenres,
  handleGenreChange,
  sort,
  handleSortChange,
}) => {
  return (
    // <div className="tool-bar">
    <AppBar position="static" className="tool-bar">
      <Toolbar>
        {allGenres.map((genre) => (
          <Box
            key={genre.value}
            className={
              selectedGenres.includes(genre.value)
                ? "genre-btn active-toolbar-button"
                : "genre-btn"
            }
            onClick={() => handleGenreChange(genre)}
          >
            {genre.value}
          </Box>
        ))}
        <Grid item>
          <Box>
            <form noValidate autoComplete="off">
              <TextField
                id="outlined-select-gender"
                select
                value={sort}
                onChange={handleSortChange}
                InputLabelProps={{ shrink: false }}
                margin="normal"
                variant="outlined"
                sx={{
                  borderRadius: "20px",
                }}
              >
                <MenuItem value={"releaseDate"}>Release Date</MenuItem>
                <MenuItem value={"viewCount"}>View Count</MenuItem>
              </TextField>
            </form>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
    // </div>
  );
};

export default GenrePanel;
