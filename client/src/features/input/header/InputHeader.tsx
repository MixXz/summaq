import { Box, Slider, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import './InputHeader.css';

const marks = [
  {
    value: 0,
    label: 'Short',
  },
  {
    value: 50,
    label: 'Medium',
  },
  {
    value: 100,
    label: 'Long',
  },
];

const InputHeader = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='input-header-main-cont'>
      <Tabs value={value} onChange={handleChange} sx={{ marginTop: 'auto' }}>
        <Tab label='Paragraph' className='input-header-tab' />
        <Tab label='Bullet Points' className='input-header-tab' />
      </Tabs>
      {!value && (
        <Box className='input-header-slider-cont' sx={{ ml: 5 }}>
          <Box width={150}>
            <Slider defaultValue={50} step={null} marks={marks} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default InputHeader;
