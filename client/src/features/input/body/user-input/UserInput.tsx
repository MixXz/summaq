import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Dispatch, SetStateAction } from 'react';

import './UserInput.css';

type Props = {
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
};

const UserInput = ({ handleSubmit, setInput }: Props) => {
  return (
    <div className='user-input-main-cont'>
      <textarea
        placeholder='Enter or paste your text and click "Sumamrize."'
        onChange={(e) => setInput(e.target.value)}
      />
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
          onClick={handleSubmit}
        >
          Summarize
        </Button>
      </div>
    </div>
  );
};

export default UserInput;
