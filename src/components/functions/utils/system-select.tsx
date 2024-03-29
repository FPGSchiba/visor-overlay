import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Checkbox, Typography } from '@mui/material';
import { ICompleteSystem, ISystem, ISystemSmall } from '../../../store/format/system.format';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/format';
import { getSystem, getSystems } from '../../../store/actions/reports';

const filter = createFilterOptions<SystemOptionType>();

export default function SystemSelect(props: {className: string, value: SystemOptionType | null, setValue: React.Dispatch<React.SetStateAction<SystemOptionType>>, setId: (id: string) => void, disabled: boolean }) {
  const { value, setValue, setId, disabled } = props;
  const dispatch = useDispatch();

  const [systems, setSystems] = useState<SystemOptionType[]>([]);
  const [remoteSystems, setRemoteSystems] = useState<ISystemSmall[]>([]);

  const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
  const userToken = useSelector((state: AppState) => state.authState.currentUser.token);

  useEffect(() => {
    dispatch(getSystems(orgToken, userToken, (err: any, data: ISystemSmall[]) => {
      if (err) {
        console.error(err);
      } else {
        setRemoteSystems(data);
        let temp: SystemOptionType[] = [];
        data.map((value) => {
          temp.push({label: `${value.name}`});
        });
        setSystems(temp);
      }
    }))
  }, [userToken, orgToken])

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
          if (newValue != null) {
            setValue(newValue);
            if (newValue.label) {
              setId(remoteSystems.filter((value) => value.name === newValue.label)[0].id || '');
            }
          } else {
            setValue(undefined);
          }
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
        <TextField {...params} value={value && value.label ? value.label : ''} label="System*" />
      )}
      className={props.className}
      disabled={disabled}
    />
  );
}

export interface SystemOptionType {
  inputValue?: string;
  label: string;
}


export function ObjectSelect(props: {className: string, value: SystemOptionType | null, setValue: React.Dispatch<React.SetStateAction<SystemOptionType>>, selectedSystem: SystemOptionType, selectedId: string, setPlanetLevelObject: (has: boolean) => void, disabled: boolean }) {
  const { value, setValue, selectedSystem, selectedId, setPlanetLevelObject, disabled } = props;
  const dispatch = useDispatch();
  const [system, setSystem] = useState<ICompleteSystem>();
  const [objects, setObjects] = useState<SystemOptionType[]>([]);
  const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
  const userToken = useSelector((state: AppState) => state.authState.currentUser.token);

  // Has Planet level object? => Free Text?

  useEffect(() => {
    if (selectedId != '') {
      dispatch(getSystem(orgToken, userToken, selectedId, (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          if (data && data.stellarObjects.length > 0) {
            let temp: SystemOptionType[] = [];
            data.stellarObjects.map((value) => {
              temp.push({label: `${value.name} (${value.type})`})
            });
            setObjects(temp);
          }
          setSystem(data);
        }
      }))
    }
  }, [orgToken, userToken, selectedId])

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            label: newValue,
          });
          setPlanetLevelObject(false);
        } else if (newValue && newValue.inputValue) {
          setValue({
            label: newValue.inputValue,
          });
          setPlanetLevelObject(false);
        } else {
          if (newValue != null) {
            setValue({...newValue, label: newValue.label.replace(/\s\(\w+\)$/, '')});
            if (newValue.label) {
              if (system.stellarObjects.filter((value) => `${value.name} (${value.type})` == newValue.label)[0].planetLevelObjects && system.stellarObjects.filter((value) => `${value.name} (${value.type})` == newValue.label)[0].planetLevelObjects.length > 0) {
                setPlanetLevelObject(true);
              } else {
                setPlanetLevelObject(false);
              }
            } else {
              setPlanetLevelObject(false);
            }
          } else {
            setPlanetLevelObject(false);
            setValue(undefined);
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
        <TextField {...params} label="Stellar Object*" />
      )}
      className={props.className}
      disabled={selectedSystem ? disabled : true}
    />
  );
}

export function PlanetLevelOverwrite(props: { setHasPlanetLevelObject: (has: boolean) => void, hasPlanetLevelObject: boolean, disabled: boolean}) {
  const {hasPlanetLevelObject, setHasPlanetLevelObject, disabled} = props;
  const [value, setValue] = useState(false);

  const handleChange = (event: any) => {
    setHasPlanetLevelObject(event.target.value !== 'true');
  }

  useEffect(() => {
    setValue(hasPlanetLevelObject);
  }, [hasPlanetLevelObject])

  return (
    <div className='mReport mReport-form mReport-form__plo-wrapper'>
      <Typography color={ disabled ? '#aaa' : '#fff'} className='mReport mReport-form mReport-form__plo-text' variant='body1' >POI is a Planet Level Object</Typography>
      <Checkbox
        onChange={handleChange}
        value={value}
        checked={value}
        className='mReport mReport-form mReport-form__plo-checkbox'
        disabled={disabled}
      />
    </div>
  )
}

export function PLOSelect(props: {className: string, value: SystemOptionType | null, setValue: React.Dispatch<React.SetStateAction<SystemOptionType>>, selectedId: string, selectedStellarObject: SystemOptionType, disabled: boolean }) {
  const { value, setValue, selectedId, selectedStellarObject, disabled } = props;
  const dispatch = useDispatch();
  const [objects, setObjects] = useState<SystemOptionType[]>([]);
  const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
  const userToken = useSelector((state: AppState) => state.authState.currentUser.token);

  useEffect(() => {
    if (selectedId != '') {
      dispatch(getSystem(orgToken, userToken, selectedId, (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          if (data && data.stellarObjects.length > 0) {
            let temp: SystemOptionType[] = [];
            data.stellarObjects.map((value) => {
              if (selectedStellarObject && selectedStellarObject.label.match(value.name) && value.planetLevelObjects && value.planetLevelObjects.length > 0) {
                value.planetLevelObjects.map((plo) => {
                  temp.push({label: `${plo.name} (${plo.type})`});
                })
              }
            });
            setObjects(temp);
          }
        }
      }))
    }
  }, [orgToken, userToken, selectedId, selectedStellarObject])

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
          if (newValue != null) {
            setValue({...newValue, label: newValue.label.replace(/\s\(\w+\)$/, '')});
          } else {
            setValue(undefined);
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
        <TextField {...params} label="Planet Level Object" />
      )}
      className={props.className}
      disabled={selectedStellarObject ? disabled : true}
    />
  );
}