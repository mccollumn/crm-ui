import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

const SearchCategory = ({ categoryHandler }: SearchCategoryProps) => {
  const [category, setCategory] = React.useState<string | null>("accounts");

  const handleCategorySelect = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: string | null
  ) => {
    if (newCategory !== null) {
      setCategory(newCategory);
      categoryHandler(newCategory);
    }
  };

  return (
    <ToggleButtonGroup
      value={category}
      exclusive
      onChange={handleCategorySelect}
      size="small"
      aria-label="search category"
    >
      <ToggleButton value="accounts" aria-label="accounts">
        Accounts
      </ToggleButton>
      <ToggleButton value="assets" aria-label="assets">
        Assets
      </ToggleButton>
      <ToggleButton value="cases" aria-label="cases">
        Cases
      </ToggleButton>
      <ToggleButton value="comments" aria-label="case comments">
        Case Comments
      </ToggleButton>
      <ToggleButton value="contacts" aria-label="contacts">
        Contacts
      </ToggleButton>
      <ToggleButton value="opportunities" aria-label="opportunities">
        Opportunities
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

interface SearchCategoryProps {
  categoryHandler: Function;
}

export default SearchCategory;
