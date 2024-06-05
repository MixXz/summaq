import Input from './features/input/Input';
import './App.css';
import { Typography } from '@mui/material';

const App = () => {
  return (
    <div className='app-main-cont'>
      <Typography className='app-title'>
        Summa<span style={{ color: '#1c74d4' }}>Q</span>
      </Typography>
      <Typography
        className='app-subtitle'
        width='50rem'
        textAlign='center'
        mb={5}
      >
        <strong>
          Unlock <span style={{ color: '#1c74d4' }}>Understanding</span>
        </strong>
        : Summarize complex text into clear, concise points for easier learning
        and engaging presentations.
      </Typography>
      <Input />
    </div>
  );
};

export default App;
