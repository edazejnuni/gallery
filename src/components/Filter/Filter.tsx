import React, { useState, useEffect } from "react";
import "./Filter.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface FilterProps {
  filterOptions: string[];
  onFilterChange: (selectedValue: string | null) => void;
  selectedFilter: string;
  defaultFilter: string;
}

const Filter: React.FC<FilterProps> = ({
  filterOptions,
  onFilterChange,
  selectedFilter,
  defaultFilter,
}) => {
  const [value, setValue] = useState<string | null>(selectedFilter);
  const [options, setOptions] = useState<string[]>(filterOptions);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setValue(selectedFilter);
  }, [selectedFilter]);

  return (
    <div>
      <Autocomplete
        value={value || defaultFilter}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
          onFilterChange(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        renderOption={(props, option) => {
          return (
            <span
              {...props}
              style={{
                textTransform: "capitalize",
              }}
            >
              {option}
            </span>
          );
        }}
        disableClearable
        sx={{
          width: 140,
          background: "transparent",
          borderRadius: "5px",
          border: "3px solid #ffffff",
          "& .MuiInputBase-input": {
            textTransform: "uppercase",
            color: "#ffffff",
          },
          "@media (max-width: 992px)": {
            width: "120px",
          },
        }}
        className="filter__input"
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
};

export default Filter;
