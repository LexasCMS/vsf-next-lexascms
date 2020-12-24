<h1 align="center">
  <img src="header@2x.png" width="700" alt="LexasCMS Module for Vue Storefront" />
</h1>

<h4 align="center">This is the official Vue Storefront Next module for retrieving content from <a href="https://www.lexascms.com" target="_blank">LexasCMS</a>.</h4>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#full-example">Full Example</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <a href="https://github.com/LexasCMS/vsf-next-lexascms/actions">
    <img src="https://github.com/LexasCMS/vsf-next-lexascms/workflows/CI/badge.svg" alt="CI Build Status" />
  </a>

  <a href="https://badge.fury.io/js/vsf-lexascms">
    <img src="https://badge.fury.io/js/vsf-lexascms.svg" alt="NPM Package Version" />
  </a>
</p>

<br /><br />


Table of Contents
----------------------------------------------------------------

- [Installation](#installation)
  - [Non-Nuxt Project Installation](#non-nuxt-project-installation)
  - [Nuxt Project Installation](#nuxt-project-installation)
- [How to Use](#how-to-use)
  - [Fetching a collection](#fetching-a-collection)
    - [Supported parameters](#supported-parameters)
  - [Fetching a single item](#fetching-a-single-item)
    - [Supported parameters](#supported-parameters-1)
  - [Request Context](#request-context)
  - [Supporting Content Previews](#supporting-content-previews)
- [Full Example](#full-example)
- [License](#license)


Installation
----------------------------------------------------------------

### Non-Nuxt Project installation

The follow instructions are for installing `vsf-lexascms` within a **Non-Nuxt based** Vue Storefront project.

#### 1. Install the NPM package

Install the `vsf-lexascms` NPM package by running one of the following commands:

```bash
# Yarn
yarn add vsf-lexascms

# NPM
npm install vsf-lexascms
```

#### 2. Setup module

Once you have installed the package, you simply need to import and call the `vsf-lexascms` modules `setup` method:

```ts
import { setup } from 'vsf-lexascms'

setup({
  spaceId: 'YOUR_SPACE_ID',
  apiKey: 'YOUR_API_KEY' // Optional, unless using content previews
})
```


### Nuxt Project installation

The follow instructions are for installing `vsf-lexascms` within a **Nuxt based** Vue Storefront project.

#### 1. Install the NPM package

Install the `vsf-lexascms` NPM package by running one of the following commands:

```bash
# Yarn
yarn add vsf-lexascms

# NPM
npm install vsf-lexascms
```

#### 2. Configure the module

Add the `vsf-lexascms` Nuxt module to the `buildModules` section of your projects `nuxt.config.js` file:

```js
export default {
  // ...

  buildModules: [
    // ...

    [
      'vsf-lexascms/nuxt',
      {
        spaceId: 'YOUR_SPACE_ID',
        apiKey: 'YOUR_API_KEY' // Optional, unless using content previews
      }
    ]
  ]

  // ...
};
```

#### 3. Configure @vue-storefront/nuxt

Still within your projects `nuxt.config.js` file, add `vsf-lexascms` to the `useRawSource` config for the `@vue-storefront/nuxt` module:

```js
export default {
  // ...

  buildModules: [
    [ '@vue-storefront/nuxt', {
      // ...

      useRawSource: {
        dev: [
          // ...

          'vsf-lexascms'
        ],
        prod: [
          // ...

          'vsf-lexascms'
        ]
      }

      // ...
    } ]
  ]

  // ...
};
```


How To Use
----------------------------------------------------------------

Once you have installed the `vsf-lexascms` module, usage is exactly the same between both Nuxt and Non-Nuxt projects.

Content is retrieved using the `useContent` composable.

```ts
import { useContent } from 'vsf-lexascms';

const { search, content, loading, error } = useContent();
```

- `search` is a function and is used for retrieving content from LexasCMS.
- `content`, `loading` and `error` are all computed properties which are populated by the `search` method
  - `content` contains the content retrieved by the search method
  - `loading` is a boolean which communicates whether the `search` method is currently running or not
  - `error` is null unless an error is thrown by the `search` method, in which case this contains the error message


### Fetching a collection

The following code snippet shows an example of how you could retrieve a collection of promo banners from LexasCMS.

```ts
import { useContent } from 'vsf-lexascms';

export default {
  setup() {
    const { search, content, loading, error } = useContent();

    await search({
      type: 'collection',
      contentType: 'promoBanners'

      // Optionally provide additional params, see supported parameters below
      // params: {
      //   
      // }
      //
      // Override the request context for this request, see the 'Request Context' section for more details
      // context: {
      //
      // }
    });

    return { content, loading, error };
  }
};
```

#### Supported parameters

As suggested in the code snippet above, you can also pass some additional parameters for making your queries more specific (e.g. filtering, localisation etc.).

| Name        | Type   | Required | Example                               | Comments                                                                                                                                                              |
|-------------|--------|----------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fields      | Object | N        | `{ promoBanner: 'title,subtitle' }`   | See [sparse fieldsets documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/sparse-fieldsets/) for more info.                           |
| filter      | Object | N        | `{ title: { _startsWith: 'Hello' } }` | See [filtering documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/filtering/) for more info.                                         |
| include     | String | N        | `backgroundImage`                   | See [fetching records documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/fetching-records/#including-related-records) for more info. |
| localeCode  | String | N        | `en-GB`                               | See [localisation documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/localisation/) for more info.                                   |
| page        | Object | N        | `{ limit: 2, skip: 4 }`               | See [pagination documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/pagination/) for more info.                                       |
| sort        | String | N        | `title`                  | See [ordering documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/ordering/) for more info.                                           |


### Fetching a single item

The following code snippet shows an example of how you could retrieve an individual promo banner from LexasCMS.

```ts
import { useContent } from 'vsf-lexascms';

export default {
  setup() {
    const { search, content, loading, error } = useContent();

    await search({
      type: 'item',
      contentType: 'promoBanner',
      itemId: 'example-promo-banner-id'

      // Optionally provide additional params, see supported parameters below
      // params: {
      //   
      // }
      //
      // Override the request context for this request, see the 'Request Context' section for more details
      // context: {
      //
      // }
    });

    return { content, loading, error };
  }
};
```

#### Supported parameters

As suggested in the code snippet above, you can also pass some additional parameters for making your queries more specific (e.g. localisation).

| Name        | Type   | Required | Example                               | Comments                                                                                                                                                              |
|-------------|--------|----------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fields      | Object | N        | `{ promoBanner: 'title,subtitle' }`   | See [sparse fieldsets documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/sparse-fieldsets/) for more info.                           |
| include     | String | N        | `backgroundImage`                   | See [fetching records documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/fetching-records/#including-related-records) for more info. |
| localeCode  | String | N        | `en-GB`                               | See [localisation documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/localisation/) for more info.                                   |


### Request Context

In the event that you would like to provide a request context with your requests to LexasCMS (i.e. for content personalisation), you can pass the `context` property to the `search` function.

The following snippet shows an example of setting the request context:

```ts
import { useContent } from 'vsf-lexascms';

export default {
  setup() {
    const { search, content, loading, error } = useContent();

    await search({
      type: 'collection',
      contentType: 'promoBanner',
      context: {
        audienceAttributes: {
          age: 25,
          location: 'GB'
        }
      }
    });

    return { content, loading, error };
  }
};
```

### Supporting Content Previews

When making use of LexasCMS's [visual content previews](https://www.lexascms.com/features/content-previews/) feature, LexasCMS will load your website with the `lexascmsRequestContent` query parameter.

The value of this parameter will be a pre-encoded request context, which should be provided directly to all requests to the Content Delivery API.

The following snippet shows an example of how this could be achieved:

```ts
import { useContent } from 'vsf-lexascms';

export default {
  setup(_, context) {
    const { search, content, loading, error } = useContent();

    await search({
      type: 'collection',
      contentType: 'promoBanner',
      context: context.root.$route.query.lexascmsRequestContext ?? null
    });

    return { content, loading, error };
  }
};
```


Full Example
----------------------------------------------------------------

The below code shows a full example of how you could create a small component which lists the available promo banners:

```vue
<template>
  <div id="promo-banners">
    <div v-if="loading">Loading promo banners...</div>
    <div v-if="error">Error loading promo banners!</div>
    <ul>
      <li v-for="promoBanner in promoBanners" :key="promoBanner.id">
        {{ promoBanner.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useContent } from 'vsf-lexascms';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'PromoBanners',
  setup() {
    // useContent
    const { search, content, loading, error } = useContent();

    // Retrieve promo banners on server-side render only
    onSSR(async () => {
      await search({
        type: 'collection',
        contentType: 'promoBanner'
      });
    });

    // Return
    return {
      promoBanners: content,
      loading,
      error
    };
  }
};
</script>
```


License
----------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE).
