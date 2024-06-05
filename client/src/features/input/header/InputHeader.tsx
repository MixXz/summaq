import { Box, Slider, Tab, Tabs } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

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

type Props = {
  summarizeLen: number;
  setSummarizeLen: Dispatch<SetStateAction<number>>;
  setIsParagraph: Dispatch<SetStateAction<boolean>>;
};

const InputHeader = ({
  summarizeLen,
  setSummarizeLen,
  setIsParagraph,
}: Props) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setIsParagraph(newValue === 0);
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSummarizeLen(newValue as number);
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
            <Slider
              marks={marks}
              step={null}
              min={marks[0].value}
              max={marks[2].value}
              value={summarizeLen}
              onChange={handleSliderChange}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default InputHeader;
