declare module "mammoth/mammoth.browser" {
  export interface ExtractResult {
    value: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: any[];
  }

  export function extractRawText(
    options: { arrayBuffer: ArrayBuffer },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any
  ): Promise<ExtractResult>;
}
