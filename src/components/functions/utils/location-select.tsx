import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/format';
import data from "../../../shared/data.json";

export interface SystemOptionType {
    inputValue?: string;
    label: string;
}

const filter = createFilterOptions<SystemOptionType>();

export function POITypeSelect(props: {className: string, value: SystemOptionType | null, setValue: React.Dispatch<React.SetStateAction<SystemOptionType>> }) {
    const { value, setValue } = props;
    const [types, setTypes] = useState<SystemOptionType[]>([]);
  
    useEffect(() => {
      let temp: SystemOptionType[] = [];
      data.dropDown.pois.map((value) => {
        temp.push({ label: `${value}`});
      });
      setTypes(temp);
    }, [data])
  
    return (
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              label: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setValue({
              label: newValue.inputValue,
            });
          } else {
            setValue(newValue);
            if (newValue.label) {
              
            }
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
  
          const { inputValue } = params;
          const isExisting = options.some((option) => inputValue === option.label);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              label: `Add "${inputValue}"`,
            });
          }
  
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={types}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.label;
        }}
        renderOption={(props, option) => <Typography variant='body1' {...props}>{option.label}</Typography>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="POI Type" />
        )}
        className={props.className}
      />
    );
}
