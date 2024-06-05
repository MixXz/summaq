import { useState } from 'react';
import InputBody from './body/InputBody';
import InputHeader from './header/InputHeader';

import './Input.css';

const Input = () => {
  const [summarizeLen, setSummarizeLen] = useState<number>(50);
  const [isParagraph, setIsParagraph] = useState<boolean>(true);

  return (
    <div className='input-main-cont'>
      <InputHeader
        summarizeLen={summarizeLen}
        setSummarizeLen={setSummarizeLen}
        setIsParagraph={setIsParagraph}
      />
      <InputBody summarizeLen={summarizeLen} isParagraph={isParagraph} />
    </div>
  );
};

export default Input;
