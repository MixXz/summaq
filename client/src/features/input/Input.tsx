import { Dispatch, SetStateAction, useState } from "react";
import InputBody from "./body/InputBody";
import InputHeader from "./header/InputHeader";

import "./Input.css";

type Props = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
};

const Input = ({ input, setInput }: Props) => {
  const [summarizeLen, setSummarizeLen] = useState<number>(50);
  const [isParagraph, setIsParagraph] = useState<boolean>(true);

  return (
    <div className="input-main-cont">
      <InputHeader
        summarizeLen={summarizeLen}
        setSummarizeLen={setSummarizeLen}
        setIsParagraph={setIsParagraph}
      />
      <InputBody
        input={input}
        setInput={setInput}
        summarizeLen={summarizeLen}
        isParagraph={isParagraph}
      />
    </div>
  );
};

export default Input;
