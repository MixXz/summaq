import { Box } from "@mui/material";

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

  return <Box sx={{ p: 2 }}>{output}</Box>;
};

export default Output;
