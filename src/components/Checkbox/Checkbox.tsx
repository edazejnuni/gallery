import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";

interface CheckboxProps {
  onCheckboxChange: (checked: boolean) => void;
}

const CheckboxIcon: React.FC<CheckboxProps> = ({ onCheckboxChange }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onCheckboxChange(isChecked);
  };

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleCheckboxChange}
        icon={<WhatshotOutlinedIcon />}
        checkedIcon={<WhatshotIcon />}
        inputProps={{ "aria-label": "Checkbox demo" }}
      />
    </div>
  );
};

export default CheckboxIcon;
