import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { IVISORNavigationStraightOM } from '../../../store/format/report.format';
import { Chip, FilledInput, FormControl, FormLabel, InputAdornment, MenuItem, Select } from '@mui/material';

interface NavigationStraightOMType extends IVISORNavigationStraightOM {
  inputValue?: string;
}

export default function StraightLineOmsHelper(props: {formik: any, disabled: boolean}) {
  const {formik, disabled} = props;
  const [open, toggleOpen] = React.useState(false);

  const oms = [
    'om1',
    'om2',
    'om3',
    'om4',
    'om5',
    'om6'
  ]

  const handleClose = () => {
    setDialogValue({
      om: '',
      distance: 0,
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    om: '',
    distance: 0,
  });

  const handleSubmit = () => {
    if (formik.values.navigation.straightLineOms && formik.values.navigation.straightLineOms.length >= 0) {
      const temp = formik.values.navigation.straightLineOms;
      temp.push(dialogValue);
      formik.setFieldValue('navigation.straightLineOms', temp);
    } else {
      formik.setFieldValue('navigation.straightLineOms', [dialogValue]);
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={formik.values.navigation.straightLineOms || []}
        multiple
        onChange={(event, newValue: NavigationStraightOMType[]) => {
          if (newValue.filter((value) => value.om == 'Insert OM').length == 1) {
            setDialogValue({om: 'om1', distance: 0});
            toggleOpen(true);
          } else {
            formik.setFieldValue('navigation.straightLineOms', newValue);
          }
        }}
        getOptionLabel={(option: NavigationStraightOMType) => {
          return option.om;
        }}
        renderTags={(value: NavigationStraightOMType[], getTagProps) =>
          value.map((option: NavigationStraightOMType, index: number) => (
              <Chip variant="outlined" label={`${option.om} (${option.distance} km)`} {...getTagProps({ index })} />
          ))
        }
        options={[{
          om: `Insert OM`,
          distance: 0
        }] as NavigationStraightOMType[]}
        selectOnFocus
        clearOnBlur
        renderOption={(props, option) => <li {...props}>{option.om}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
              {...params}
              variant="outlined"
              label="Straight Line OMs"
              placeholder="Select: Insert OM"
          />
        )}
        disabled={disabled}
        className='helper helper-nav helper-nav__straight'
      />
      <Dialog open={open} onClose={handleClose}>
        <form>
          <DialogTitle>Add a straight Line Orbital Marker</DialogTitle>
          <DialogContent>
            <Select
                value={dialogValue.om}
                label="Orbital Marker"
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    om: event.target.value,
                  })
                }
                className="helper helper-nav helper-nav__om-select"
            >
                { oms.map((value) => {
                    return (<MenuItem key={value} value={value}>{`${value}`}</MenuItem>)
                })}
            </Select>
            <FormControl variant="filled" className="helper helper-nav helper-nav__distance">
              <FilledInput
                id="filled-adornment-weight"
                endAdornment={<InputAdornment position="end">km</InputAdornment>}
                aria-describedby="filled-weight-helper-text-om6"
                inputProps={{
                  'aria-label': 'distance',
                }}
                type="number"
                onChange={(event) => {
                  setDialogValue({
                    ...dialogValue,
                    distance: +event.target.value,
                  })
                }}
                value={dialogValue.distance}
              />
              <FormLabel id="filled-weight-helper-text-om6">Distance</FormLabel>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
