import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';
import data from '../../../shared/data.json';

const filter = createFilterOptions<SystemOptionType>();

export default function SystemSelect(props: {className: string, value: SystemOptionType | null, setValue: React.Dispatch<React.SetStateAction<SystemOptionType>> }) {
  const { value, setValue } = props;

  const systems: SystemOptionType[] = [];

  Object.keys(data.dropDown.systems).forEach((system) => {
    systems.push({ label: `${system}`});
  });

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
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
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
      options={systems}
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
        <TextField {...params} label="System" />
      )}
      className={props.className}
    />
  );
}

export interface SystemOptionType {
  inputValue?: string;
  label: string;
}


export function ObjectSelect(props: {className: string, value: SystemOptionType | null, setValue: React.Dispatch<React.SetStateAction<SystemOptionType>>, selectedSystem: SystemOptionType }) {
    const { value, setValue, selectedSystem } = props;

  const objects: SystemOptionType[] = [];

  Object.keys(data.dropDown.systems).forEach((system) => {
    if (selectedSystem && selectedSystem.label == system) {
        data.dropDown.systems[system as keyof typeof data.dropDown.systems].forEach((object) => {
            objects.push({ label: `${object}`});
        });
    }
  });

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
      options={objects}
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
        <TextField {...params} label="Object" />
      )}
      className={props.className}
      disabled={selectedSystem ? false : true}
    />
  );
}