import { LexascmsRequestContext } from './requestContext';

type LexascmsContextSearchParamsItem = {
  type: 'item';
  contentType: string;
  itemId: string;
  params?: {
    fields?: { [contentType: string]: string };
    include?: string;
    localeCode?: string;
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
    page?: {
      limit?: number;
      skip?: number;
    };
    sort?: string;
  }
  context?: LexascmsRequestContext | string;
};

export type LexascmsContextSearchParams =
  LexascmsContextSearchParamsItem |
  LexascmsContextSearchParamsCollection;
