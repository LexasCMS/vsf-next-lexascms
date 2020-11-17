<h1 align="center">
  <img src="header@2x.png" width="700" alt="LexasCMS Module for Vue Storefront" />
</h1>

<h4 align="center">This is the official Vue Storefront Next module for retrieving content from <a href="https://www.lexascms.com" target="_blank">LexasCMS</a>.</h4>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#example">Example</a> •
  <a href="#license">License</a>
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
  spaceId: 'YOUR_SPACE_ID'
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

    [ 'vsf-lexascms/nuxt', { spaceId: 'YOUR_SPACE_ID' } ]
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

The following code snippet shows an example of how you could retrieve a collection of blog posts from LexasCMS.

```ts
const { search, content, loading, error } = useContent();

await search({
  type: 'collection',
  contentType: 'blogPost'

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

console.log(content); // This would log the retrieved blog posts
```

#### Supported parameters

As suggested in the code snippet above, you can also pass some additional parameters for making your queries more specific (e.g. filtering, localisation etc.).

| Name        | Type   | Required | Example                               | Comments                                                                                                                                                              |
|-------------|--------|----------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fields      | Object | N        | `{ blogPost: 'title,publishedAt' }`   | See [sparse fieldsets documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/sparse-fieldsets/) for more info.                           |
| filter      | Object | N        | `{ title: { _startsWith: 'Hello' } }` | See [filtering documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/filtering/) for more info.                                         |
| include     | String | N        | `author,coverImage`                   | See [fetching records documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/fetching-records/#including-related-records) for more info. |
| localeCode  | String | N        | `en-GB`                               | See [localisation documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/localisation/) for more info.                                   |
| page        | Object | N        | `{ limit: 2, skip: 4 }`               | See [pagination documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/pagination/) for more info.                                       |
| sort        | String | N        | `title,-publishedAt`                  | See [ordering documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/ordering/) for more info.                                           |


### Fetching a single item

The following code snippet shows an example of how you could retrieve an individual blog post from LexasCMS.

```ts
const { search, content, loading, error } = useContent();

await search({
  type: 'item',
  contentType: 'blogPost',
  itemId: 'sample-blog-post-id'

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

console.log(content); // This would log the retrieved blog post
```

#### Supported parameters

As suggested in the code snippet above, you can also pass some additional parameters for making your queries more specific (e.g. localisation).

| Name        | Type   | Required | Example                               | Comments                                                                                                                                                              |
|-------------|--------|----------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fields      | Object | N        | `{ blogPost: 'title,publishedAt' }`   | See [sparse fieldsets documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/sparse-fieldsets/) for more info.                           |
| include     | String | N        | `author,coverImage`                   | See [fetching records documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/fetching-records/#including-related-records) for more info. |
| localeCode  | String | N        | `en-GB`                               | See [localisation documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/localisation/) for more info.                                   |


### Request Context

In the event that you would like to set a request context on your requests to LexasCMS (i.e. for content personalisation), you can set a global request context by using the `vsf-lexascms` modules `setRequestContext` method.

You can call this method from anywhere, and doing so will automatically attach the provided context to all subsequent requests made to LexasCMS.

**Note:** You can also retrieve the current request context using the `vsf-lexascms` modules `getRequestContext` method.

The following snippet shows an example of setting the global request context:

```ts
import { getRequestContext, setRequestContext } from 'vsf-lexascms';

setRequestContext({
  audienceAttributes: {
    age: 25,
    location: 'GB'
  }
});

console.log(getRequestContext()); // Logs the current global request context
```

Full Example
----------------------------------------------------------------

The below code shows a full example of how you could create a small component which lists the available blog posts:

```vue
<template>
  <div id="blog-posts">
    <div v-if="loading">Loading blog posts...</div>
    <div v-if="error">Error loading blog posts!</div>
    <ul>
      <li v-for="blogPost in content" :key="blogPost.id">
        {{ blogPost.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useContent } from 'vsf-lexascms';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'BlogPosts',
  setup() {
    // useContent
    const { search, content, loading, error } = useContent();

    // Retrieve blog posts on server-side render only
    onSSR(async () => {
      await search({
        type: 'collection',
        contentType: 'blogPost'
      });
    });

    // Return
    return {
      content,
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
