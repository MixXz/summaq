import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import './UserInput.css';

const UserInput = () => {
  return (
    <div className='user-input-main-cont'>
      <textarea placeholder='Enter or paste your text and click "Sumamrize."' />
      <div className='user-input-buttons'>
        <Button
          variant='outlined'
          sx={{ borderRadius: 3, textTransform: 'none' }}
        >
          <UploadFileIcon sx={{ mr: 1 }} />
          Upload doc
        </Button>
        <Button
          variant='contained'
          sx={{ mr: 5, borderRadius: 3, textTransform: 'none' }}
        >
          Summarize
        </Button>
      </div>
    </div>
  );
};

export default UserInput;
