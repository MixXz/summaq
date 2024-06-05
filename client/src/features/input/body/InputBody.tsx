import { Backdrop, CircularProgress, Grid, Snackbar } from '@mui/material';
import UserInput from './user-input/UserInput';
import Output from './output/Output';
import { useState } from 'react';

import './InputBody.css';
import axiosInstance from '../../../lib/axios';

type Props = {
  summarizeLen: number;
  isParagraph: boolean;
};

const InputBody = ({ summarizeLen, isParagraph }: Props) => {
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('text', input);
      formData.append(
        'summary_percentage',
        getSummaryPercentage(summarizeLen).toString()
      );
      formData.append('bullet_format', (!isParagraph).toString());

      const response = await axiosInstance.post('/summarize/', formData);

      setOutput(response.data.result);
    } catch (error) {
      console.error('Error occurred:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getSummaryPercentage = (summarizeLen: number): number => {
    return summaryPercentages[summarizeLen] || 50;
  };

  const summaryPercentages: Record<number, number> = {
    0: 50,
    50: 75,
    100: 90,
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: 10 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        onClose={() => setIsError(false)}
        message='An error occurred.'
      />
      <Grid container spacing={0} className='input-body-main-cont'>
        <Grid item lg={6}>
          <UserInput setInput={setInput} handleSubmit={handleSubmit} />
        </Grid>
        <Grid item lg={6}>
          <Output output={output} />
        </Grid>
      </Grid>
    </>
  );
};

export default InputBody;
