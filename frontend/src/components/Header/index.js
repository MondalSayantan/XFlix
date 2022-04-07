import React from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

import UploadForm from "../UploadForm";

const Header = ({ isAtHome, children }) => {
  const [open, setOpen] = React.useState(false);

  const handleUploadClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      {isAtHome ? (
        <div>
          <UploadForm visibility={open} setVisibility={setOpen} id="upload-btn"/>
          <AppBar position="static">
            <Toolbar>
              <Link to="/">
                <Box component="img" src="/Logo.png" alt="XFlix" />
              </Link>
              <Box sx={{ flexGrow: 1 }} />
              {children}
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                onClick={handleUploadClick}
                endIcon={<FileUploadIcon />}
                id={"upload-btn"}
              >
                Upload
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      ) : (
        <AppBar position="static" sx={{ background: "#202020" }}>
          <Toolbar>
            <Link to="/">
              <Box component="img" src="/Logo.png" alt="XFlix" />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default Header;
