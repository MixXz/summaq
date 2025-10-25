type Props = {
  output: string | string[] | null;
};

const Output = ({ output }: Props) => {
  if (!output) return null;

  if (Array.isArray(output)) {
    return (
      <div className="output-main-cont">
        <ul className="output-list">
          {output.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <div className="output-main-cont">{output}</div>;
};

export default Output;
