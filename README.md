<p align="center">
  <h1 align="center">Penjing</h1>
  <h4 align="center">A port of <a href="https://github.com/algolia/frontman/blob/master/lib/frontman/sitemap_tree.rb" target="_blank">Frontman's <code>SitemapTree</code></a> in TypeScript.</h4>

  <p align="center">
    <img src="https://img.shields.io/npm/v/penjing" alt="npm version" />
    <img src="https://img.shields.io/github/workflow/status/sarahdayan/sitemaptree/CI/master" alt="GitHub Workflow Status" />
    <img src="https://img.shields.io/node/v/penjing" alt="Node.js supported versions" />
    <img src="https://img.shields.io/bundlephobia/minzip/penjing" alt="npm bundle size" />
    <img src="https://img.shields.io/npm/l/penjing" alt="License" />
  </p>
</p>

Penjing is a data structure to represent pages from a static site. It lets you retrieve any resource from the tree with constant time complexity.

## Install

```sh
npm install penjing
# or
yarn add penjing
```

## Usage

```ts
import { SitemapTree, Resource } from 'penjing'

const tree = new SitemapTree()

tree.add(new Resource('path/to/first.md'))
tree.add(new Resource('path/to/second.md'))

tree.children[0].children[0].children[0].resource.source // "path/to/first.md"

tree.fromUrl('path/to/second').children[0].resource.source // "path/to/second.md"
```

### Windows

Paths are normalized. If you're running this package on Windows, make sure to use `\\` instead of `/` in your paths, or `path.normalize` to ensure that your input paths match the ones in your `Resource` instances.

## API

### `SitemapTree`

Create a tree of resources.

#### `SitemapTree.resource`

> `Resource | null`

The attached resource.

#### `SitemapTree.parent`

> `SitemapTree | null`

The parent of the sitemap tree.

#### `SitemapTree.children`

> `SitemapTree[]`

The children of the sitemap tree.

#### `SitemapTree.url`

> `string | null`

The URL of the sitemap tree.

#### `SitemapTree.urlPart`

> `string | null`

The URL part of the sitemap tree.

#### `SitemapTree.siblings`

> `SitemapTree[]`

The siblings of the sitemap tree, including itself.

#### `SitemapTree.allUrls`

> `Record<string, SitemapTree>`

All URLs in the sitemap tree.

#### `SitemapTree.add(resource)`

> `(resource: Resource): void`

Add a resource to the sitemap tree.

#### `SitemapTree.fromUrl(url)`

> `(url: string): SitemapTree`

Retrieve a sub-tree in a sitemap tree from a URL.

#### `SitemapTree.fromResource(resource)`

> `(resource: Resource): SitemapTree`

Retrieve a sub-tree in a sitemap tree from a resource.

### `Resource`

Create a resource from a file path.
