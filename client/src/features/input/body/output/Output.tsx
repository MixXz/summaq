import './Output.css';

type Props = {
  output: string;
};

const Output = ({ output }: Props) => {
  return <div className='output-main-cont'>{output}</div>;
};

export default Output;
