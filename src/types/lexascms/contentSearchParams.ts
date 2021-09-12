import { LexascmsRequestContext } from './requestContext';

type LexascmsPageParamLimitSkip = {
  limit?: number;
  skip?: number;
};

type LexascmsPageParamGeneric = {
  [key: string]: LexascmsPageParamLimitSkip | LexascmsPageParamGeneric;
};

type LexascmsContextSearchParamsItem = {
  type: 'item';
  contentType: string;
  itemId: string;
  params?: {
    fields?: { [contentType: string]: string };
    include?: string;
    localeCode?: string;
    page?: LexascmsPageParamGeneric;
  };
  context?: LexascmsRequestContext | string;
};

type LexascmsContextSearchParamsCollection = {
  type: 'collection';
  contentType: string;
  params?: {
    fields?: { [contentType: string]: string };
    filter?: { [prop: string]: any };
    include?: string;
    localeCode?: string;
    page?: LexascmsPageParamLimitSkip | LexascmsPageParamGeneric;
    sort?: string;
  }
  context?: LexascmsRequestContext | string;
};

export type LexascmsContextSearchParams =
  LexascmsContextSearchParamsItem |
  LexascmsContextSearchParamsCollection;
