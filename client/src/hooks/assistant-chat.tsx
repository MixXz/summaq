import { useCallback, useMemo, useRef, useState } from "react";
import axiosInstance from "../lib/axios";

type QaResponse = { result: string };

export const useAssistantChat = () => {
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setAnswer("");
    setError("");
  }, []);

  const askWithText = useCallback(async (context: string, question: string) => {
    if (!question?.trim()) return;
    setLoading(true);
    setError("");
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    try {
      const form = new FormData();
      form.append("text", context);
      form.append("question", question);

      const { data } = await axiosInstance.post<QaResponse>("/answer/", form, {
        signal: abortRef.current.signal,
      });
      setAnswer(data.result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? e?.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const askWithFile = useCallback(async (file: File, question: string) => {
    if (!file || !question?.trim()) return;
    setLoading(true);
    setError("");
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("question", question);

      const { data } = await axiosInstance.post<QaResponse>("/answer/", form, {
        headers: { "Content-Type": "multipart/form-data" },
        signal: abortRef.current.signal,
      });
      setAnswer(data.result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? e?.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  return useMemo(
    () => ({ answer, loading, error, askWithText, askWithFile, cancel, reset }),
    [answer, loading, error, askWithText, askWithFile, cancel, reset]
  );
};
export default useAssistantChat;
