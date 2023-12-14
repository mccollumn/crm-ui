"use client";

import * as React from "react";
import TextField, { BaseTextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  // "& .MuiInput-root": {
  //   color: theme.palette.grey[50],
  // },
  // "& .MuiInputBase-input": {
  //   color: theme.palette.grey[50],
  // },
  // "& label": {
  //   color: theme.palette.grey[50],
  // },
  // "& label.Mui-focused": {
  //   color: theme.palette.primary.light,
  // },
  // "& .MuiInput-root.Mui-focused .MuiInputAdornment-root": {
  //   color: theme.palette.primary.light,
  // },
  // "& .MuiInput-underline::before": {
  //   borderBottomColor: theme.palette.grey[50],
  // },
  // "& .MuiInput-underline::after": {
  //   borderBottomColor: theme.palette.primary.light,
  // },
  // "& .MuiInput-underline:not(.Mui-disabled):hover::before": {
  //   borderBottomColor: theme.palette.grey[50],
  // },
}));

const SearchInput = ({
  searchHandler,
  enterKeyHandler,
  label,
  placeholder,
  ...props
}: SearchInputProps) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    searchHandler(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!enterKeyHandler) return;
    if (event.key === "Enter") {
      enterKeyHandler(value);
    }
  };

  return (
    <StyledTextField
      id="search"
      label={label}
      type="search"
      size="small"
      margin="dense"
      InputProps={{
        placeholder: placeholder,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

interface SearchInputProps extends BaseTextFieldProps {
  searchHandler: Function;
  enterKeyHandler?: Function;
  label?: string;
  placeholder?: string;
}

export default SearchInput;
