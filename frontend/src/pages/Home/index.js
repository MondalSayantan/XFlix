import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { endpoint } from "../../App";
import Dashboard from "../../components/Dashboard";
import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const allGenres = [
  { label: "All", value: "All" },
  { label: "Education", value: "Education" },
  { label: "Sports", value: "Sports" },
  { label: "Comedy", value: "Comedy" },
  { label: "Lifestyle", value: "Lifestyle" },
];

const allAgeGroups = [
  { label: "Any age group", value: "Anyone" },
  { label: "7+", value: "7+" },
  { label: "12+", value: "12+" },
  { label: "16+", value: "16+" },
  { label: "18+", value: "18+" },
];

const sortingOptions = [
  { label: "Release Date", value: "releaseDate" },
  { label: "View Count", value: "viewCount" },
];

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [genres, setGenres] = useState(["All"]);
  const [ageGroup, setAgeGroup] = useState([allAgeGroups[0].value]);
  const [sort, setSort] = useState([sortingOptions[0].value]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleValueInList = (array, value) => {
    if (array.includes(value)) {
      return array.filter((item) => item !== value);
    } else {
      return [...array, value];
    }
  };

  const handleGenreChange = (genre) => {
    const all = "All";
    const newGenreValue = genre.value;
    if (newGenreValue === all) {
      setGenres([all]);
    } else {
      // return the array of genres without all in it
      const genresWithoutAll = genres.filter((item) => item !== all);
      const newGenres = toggleValueInList(genresWithoutAll, newGenreValue);
      setGenres(newGenres);

      if (newGenres.length === 0) {
        setGenres([all]);
      }
    }
  };

  const handleAgeGroupChange = (age) => {
    setAgeGroup([age.value]);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const urlToBeSent = () => {
    let url = null;
    if (ageGroup[0] === "Anyone") {
      url = endpoint + `/v1/videos?contentRating=Anyone&sortBy=${sort[0]}`;
    } else {
      url =
        endpoint +
        `/v1/videos?contentRating=${encodeURIComponent(ageGroup[0])}&sortBy=${
          sort[0]
        }`;
    }

    if (genres.length === 1) {
      if (url) url += "&genres=" + genres[0];
      else url = "?genres=" + genres[0];
    } else if (genres.length > 1) {
      let genreString = genres.join(",");
      if (url) url += "&genres=" + genreString;
      else url = "?genres=" + genreString;
    }
    console.log(url);
    return url;
  };

  const performApiCall = async () => {
    setIsLoading(true);
    const url = urlToBeSent();
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

  const performSearch = async (text) => {
    setIsLoading(true);
    const url = urlToBeSent() + "&title=" + text;
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

  const debounceSearch = (event, debounceTimeout) => {
    const value = event.target.value;
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      performSearch(value);
    }, 500);
    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    performApiCall();
  }, [genres, ageGroup, sort]);

  return (
    <div>
      <Header isAtHome={true}>
        <TextField
          className="search-desktop"
          size="small"
          // fullWidth
          InputProps={{
            className: "search",
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search"
          name="search"
          onChange={(event) => debounceSearch(event, debounceTimeout)}
        />
      </Header>
      <Dashboard
        allGenres={allGenres}
        selectedGenres={genres}
        handleGenreChange={handleGenreChange}
        allAgeGroups={allAgeGroups}
        selectedAgeGroup={ageGroup}
        handleAgeGroupChange={handleAgeGroupChange}
        sort={sort}
        handleSortChange={handleSortChange}
        videos={videos}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Home;
