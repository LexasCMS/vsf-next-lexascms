import { renderContentFactory } from '@vue-storefront/core';

import { LexascmsContent } from '../types/lexascms';

export const extractContent = function (content: LexascmsContent | null) {
  // Ensure content is an array
  if (content === null) {
    content = [];
  } else if (!(content instanceof Array)) {
    content = [ content ];
  }
  // Generate component map
  const componentMap = content.map(contentItem => ({
    componentName: contentItem.type,
    props: contentItem
  }));
  // Return
  return componentMap;
}

export const RenderContent = renderContentFactory({
  extractContent
});
