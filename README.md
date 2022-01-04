# extract-md-data

A util for getting data and metadata for all markdown files in a given dir. Useful for static site generators.

## Usage

For example, if you file structure is

```
.
└── src
    ├── docs
    │   ├── Day-One.md
    │   ├── Day-Two.md
    │   └── not-markdown.txt
    └── index.js
```

`Day-One.md`

```md
---
title: day one
tags:
  - foo
  - bar
---

# On the first day

God created markdown
```

`Day-Two.md`

```md
---
title: day two
tags:
  - baz
  - pistachio
---

# On the second day

God created another markdown
```

To get JSON data for all the markdown files in `docs` folder:

```js
// index.js

const mdExtract = require('extract-md-data');
const path = require('path');

/* Define project rootDir and relative source dir where the markdown files live */
const rootDir = path.resolve(__dirname);
const relSrcDir = 'docs';

const jsons = mdExtract(rootDir, relSrcDir);

console.log(jsons);
```

```json
[
  {
    "fm": {
      "title": "day one",
      "tags": ["foo", "bar"]
    },
    "content": "\n# On the first day\n\nGod created markdown\n",
    "relativePath": "nested/layer2/Day-One.md",
    "filename": "Day-One.md",
    "slug": "day-one",
    "id": 1056230571
  },
  {
    "fm": {
      "title": "day two",
      "tags": ["baz", "pistachio"]
    },
    "content": "\n# On the second day\n\nGod created another markdown\n",
    "relativePath": "nested/layer2/Day-Two.md",
    "filename": "Day-Two.md",
    "slug": "day-two",
    "id": 3295981379
  }
]
```

This data can be used with templating libraries like [`pug`](https://pugjs.org/) or [`handlebars`](https://handlebarsjs.com/) to build out static websites based off the markdown files. You can make your won routing logic - perhaps you want to leverage `relativePath`? up to you!

## Features

- gets data for all files in `srcDir` with `.md` and `.markdown` extensions, recursively
- ignores non-markdown files
- extracts any custom yaml frontmatter into an object `fm`
- generates a unique `id` for each file by hashing the `relativePath`
- generates a url-safe `slug` for each file based on the `filename`

## Config

You can optionally pass a config object as a third argument.

Currently, [options for `slugify`](https://github.com/simov/slugify#options) can be passed in `config.slugify`

```js
const customConfig = {
  slugify: {
    lower: false
  }
};

const jsons = mdExtract(rootDir, relSrcDir, customConfig);

console.log(jsons[0]);
```

```json

[
  {
    "fm": {
      "title": "day one",
      "tags": ["foo", "bar"]
    },
    "content": "\n# On the first day\n\nGod created markdown\n",
    "relativePath": "nested/layer2/Day-One.md",
    "filename": "Day-One.md",
    "slug": "Day-One",  <======== slug casing is preserved
    "id": 1056230571
  },
  ...
]
```

Default slugify settings are:

```js
{
  slugify: {
    replacement: '-',
    remove: /[*+~.()'"!:@$%^()]/g,
    lower: true,
    strict: true,
    trim: true
  }
}
```

## Development

### Install

`npm install`

### Testing

`npm run test`
