import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import './InputHeader.css';

const InputHeader = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className='input-header-main-cont'>
      <span className='input-header-text'>Modes:</span>
      <Tabs value={value} onChange={handleChange}>
        <Tab label='Paragraph' className='input-header-tab' />
        <Tab label='Bullet Points' className='input-header-tab' />
      </Tabs>
    </div>
  );
};

export default InputHeader;
