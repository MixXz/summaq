import { Grid } from '@mui/material';
import UserInput from './user-input/UserInput';
import Output from './output/Output';

import './InputBody.css';

const InputBody = () => {
  return (
    <Grid container spacing={0} className='input-body-main-cont'>
      <Grid item lg={6}>
        <UserInput />
      </Grid>
      <Grid item lg={6}>
        <Output />
      </Grid>
    </Grid>
  );
};

export default InputBody;
