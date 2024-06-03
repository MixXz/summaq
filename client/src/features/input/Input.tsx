import InputBody from './body/InputBody';
import InputHeader from './header/InputHeader';

import './Input.css';

const Input = () => {
  return (
    <div className='input-main-cont'>
      <InputHeader />
      <InputBody />
    </div>
  );
};

export default Input;
