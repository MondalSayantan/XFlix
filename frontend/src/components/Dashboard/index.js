import React from "react";
import GenrePanel from "../GenrePanel";
import ContentRatingPanel from "../ContentRatingPanel";
import MyGrid from "../MyGrid";

const Dashboard = ({
  allGenres,
  allAgeGroups,
  selectedGenres,
  selectedAgeGroup,
  handleGenreChange,
  handleAgeGroupChange,
  videos,
  sort,
  handleSortChange,
  isLoading,
}) => {
  return (
    <div>
      <GenrePanel
        allGenres={allGenres}
        selectedGenres={selectedGenres}
        handleGenreChange={handleGenreChange}
        sort={sort}
        handleSortChange={handleSortChange}
      />
      <ContentRatingPanel
        allAgeGroups={allAgeGroups}
        selectedAgeGroup={selectedAgeGroup}
        handleAgeGroupChange={handleAgeGroupChange}
      />
      <MyGrid videos={videos} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
