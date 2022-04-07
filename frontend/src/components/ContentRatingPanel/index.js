import { Box, AppBar, Toolbar } from "@mui/material";
import React from "react";
import "./ContentRatingPanel.styles.css";

const ContentRatingPanel = ({
  allAgeGroups,
  selectedAgeGroup,
  handleAgeGroupChange,
}) => {
  return (
    // <div className="tool-bar">
    <AppBar position="static" className="tool-bar">
      <Toolbar>
        {allAgeGroups.map((age) => (
          <Box
            key={age.value}
            className={
              selectedAgeGroup.includes(age.value)
                ? "content-rating-btn active-toolbar-button"
                : "content-rating-btn"
            }
            onClick={() => handleAgeGroupChange(age)}
          >
            {age.value}
          </Box>
        ))}
      </Toolbar>
    </AppBar>
    // </div>
  );
};

export default ContentRatingPanel;
