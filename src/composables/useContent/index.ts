import { Context, useContentFactory } from '@vue-storefront/core';

import { LexascmsContent, LexascmsContextSearchParams } from '../../types/lexascms/index';

export const useContent = useContentFactory<LexascmsContent, LexascmsContextSearchParams>({
  
  async search (context: Context, args: LexascmsContextSearchParams): Promise<LexascmsContent> {
    return context.$lexascms.api.getContent(args);
  }

});
