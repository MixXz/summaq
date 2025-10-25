import { Backdrop, CircularProgress, Grid, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import Output from "./output/Output";
import UserInput from "./user-input/UserInput";

import axiosInstance from "../../../lib/axios";
import "./InputBody.css";

type Props = {
  summarizeLen: number;
  isParagraph: boolean;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
};

type SummarizeResponse = { result: string | string[] };

const InputBody = ({ input, setInput, summarizeLen, isParagraph }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string | string[] | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setOutput(null);

      const formData = new FormData();
      formData.append("text", input);
      formData.append(
        "summary_percentage",
        getSummaryPercentage(summarizeLen).toString()
      );
      formData.append("bullet_format", (!isParagraph).toString());

      const { data } = await axiosInstance.post<SummarizeResponse>(
        "/summarize/",
        formData
      );

      const res = data?.result;
      if (typeof res === "string" || Array.isArray(res)) {
        setOutput(res);
      } else {
        console.error("Unexpected response:", data);
        setIsError(true);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getSummaryPercentage = (len: number): number => {
    return summaryPercentages[len] ?? 50;
  };

  const summaryPercentages: Record<number, number> = {
    0: 50,
    50: 75,
    100: 90,
  };

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        onClose={() => setIsError(false)}
        message="An error occurred."
      />
      <Grid container spacing={0} className="input-body-main-cont">
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
