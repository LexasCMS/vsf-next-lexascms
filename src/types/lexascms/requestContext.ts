export type LexascmsRequestContext = {
  audienceAttributes?: {
    [audienceAttribute: string]: string | number | boolean | null;
  };
  preview?: {
    timestamp?: number;
    includeDraftVariations?: boolean;
  }
};
