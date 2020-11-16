type LexascmsContentItem = {
  type: string;
  id: string;

  [prop: string]: any;
};

export type LexascmsContent = LexascmsContentItem | LexascmsContentItem[];
