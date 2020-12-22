<p align="center">
  <h1 align="center">SitemapTree</h1>
  <h4 align="center">A port of <a href="https://github.com/algolia/frontman/blob/master/lib/frontman/sitemap_tree.rb" target="_blank">Frontman's <code>SitemapTree</code></a> in TypeScript.</h4>

  <p align="center">
    <img src="https://img.shields.io/github/workflow/status/sarahdayan/sitemaptree/CI/master" alt="GitHub Workflow Status" />
    <img src="https://img.shields.io/node/v/@sarahdayan/sitemaptree" alt="Node.js supported versions" />
    <img src="https://img.shields.io/bundlephobia/minzip/@sarahdayan/sitemaptree" alt="npm bundle size" />
    <img src="https://img.shields.io/npm/l/@sarahdayan/sitemaptree" alt="License" />
  </p>
</p>

SitemapTree is a data structure to represent pages from a static site. It lets you retrieve any resource from the tree with constant time complexity.

## Install

```sh
npm install @sarahdayan/sitemaptree
# or
yarn add @sarahdayan/sitemaptree
```

## Usage

```ts
import { sitemaptree, resource } from '@sarahdayan/sitemaptree'

const tree = sitemaptree()

tree.add(resource('path/to/first.md'))
tree.add(resource('path/to/second.md'))

tree.children[0].children[0].children[0].resource.source // "path/to/first.md"

tree.fromUrl('path/to/second').children[0].resource.source // "path/to/second.md"
```

### Windows

Paths are normalized. If you're running this package on Windows, make sure to use `\\` instead of `/` in your paths, or `path.normalize` to ensure that your input paths match the ones in your `Resource` instances.

## API

### `sitemaptree`

> `(urlPart?: string | null): SitemapTree`

Create a tree of resources.

#### `sitemaptree.resource`

> `Resource | null`

The attached resource.

#### `sitemaptree.parent`

> `SitemapTree | null`

The parent of the sitemap tree.

#### `sitemaptree.children`

> `SitemapTree[]`

The children of the sitemap tree.

#### `sitemaptree.url`

> `string | null`

The URL of the sitemap tree.

#### `sitemaptree.urlPart`

> `string | null`

The URL part of the sitemap tree.

#### `sitemaptree.siblings`

> `SitemapTree[]`

The siblings of the sitemap tree, including itself.

#### `sitemaptree.urls`

> `Record<string, SitemapTree>`

All URLs in the sitemap tree.

#### `sitemaptree.add(resource)`

> `(resource: Resource): void`

Add a resource to the sitemap tree.

#### `sitemaptree.fromUrl(url)`

> `(url: string): SitemapTree`

Retrieve a sub-tree in a sitemap tree from a URL.

#### `sitemaptree.fromResource(resource)`

> `(resource: Resource): SitemapTree`

Retrieve a sub-tree in a sitemap tree from a resource.

### `resource`

> `(sourcePath: string, destinationPath?: string): Resource`

Create a resource from a file path.
