import React from "react";
import { useRouter } from "next/navigation";
import { ButtonNav } from "../navigation/ButtonNav";
import SearchInput from "./SearchInput";
import { Box, Stack } from "@mui/material";
import SearchCategory from "./SearchCategory";

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("account");

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const handleSubmit = () => {
    router.push(`/search?q=${query}&category=${category}`);
  };

  const handleCategorySelect = (value: string) => {
    setCategory(value);
  };

  return (
    <Stack>
      <SearchCategory categoryHandler={handleCategorySelect} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <SearchInput
          searchHandler={handleSearch}
          enterKeyHandler={handleSubmit}
          label="Search"
          variant="outlined"
          sx={{ margin: ".75rem" }}
        />
        <ButtonNav
          path={`/search?q=${query}&category=${category}`}
          sx={{ margin: ".75rem" }}
        >
          Search
        </ButtonNav>
      </Box>
    </Stack>
  );
};

export default Search;
