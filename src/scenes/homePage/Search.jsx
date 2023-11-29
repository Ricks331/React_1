import { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

let vegetableData = [
  { name: "Leafy and Salad", Parent: "", id: "item1" },
  { name: "Beans", Parent: "", id: "item2" },
  { name: "CoCo", Parent: "", id: "item3" },
];
let items = [
  { name: "Cabbage", Parent: "Leafy and Salad", id: "item1" },
  { name: "Spinach", Parent: "Leafy and Salad", id: "item2" },
  { name: "Wheat grass", Parent: "Leafy and Salad", id: "item3" },
  { name: "Yarrow", Parent: "Leafy and Salad", id: "item4" },
  { name: "Pumpkins", Parent: "Leafy and Salad", id: "item5" },
  { name: "Chickpea", Parent: "Beans", id: "item6" },
  { name: "Green bean", Parent: "Beans", id: "item7" },
  { name: "abcd", Parent: "Beans", id: "item8" },
  { name: "efgh", Parent: "Beans", id: "item9" },
  { name: "ijkl", Parent: "Beans", id: "item10" },
  { name: "mnop", Parent: "Beans", id: "item11" },
  { name: "qrst", Parent: "Beans", id: "item12" },
  { name: "uvws", Parent: "Beans", id: "item13" },
  { name: "Chocolate", Parent: "CoCo", id: "item14" },
  { name: "Coffee", Parent: "CoCo", id: "item15" },
  { name: "Milk", Parent: "CoCo", id: "item16" },
  { name: "Bar", Parent: "CoCo", id: "item17" },
  { name: "Cone", Parent: "CoCo", id: "item18" },
  { name: "Fruit", Parent: "CoCo", id: "item19" },
  { name: "nut", Parent: "CoCo", id: "item20" },
];

const Search = () => {
  const [list, setList] = useState(vegetableData);
  const [open, setOpen] = useState(true);

  const handleInputChange = (event, newInputValue) => {
    if (newInputValue == "") {
      setList(vegetableData);
    } else {
      const found = items.filter((obj) => {
        return obj.Parent === newInputValue;
      });
      if (found.length > 0) {
        setList(found);
      }
    }
  };

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      // open={open}
      //  value={list.find((option) => option.id === "item1")}
      options={list}
      groupBy={(option) => option.Parent}
      getOptionLabel={(option) => option.name} // Replace with your API response data structure
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search name or Ad. No...."
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
};

export default Search;
