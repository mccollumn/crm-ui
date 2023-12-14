import * as React from "react";
import { IconButton, Popover } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "@/theme";

const SearchPopover = ({ children }: { children: React.ReactNode }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-label="search"
        size="large"
        onClick={handleClick}
        sx={{ color: theme.palette.grey[50] }}
      >
        <SearchIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {children}
      </Popover>
    </div>
  );
};

export default SearchPopover;
