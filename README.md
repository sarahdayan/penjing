# SitemapTree

A port of [Frontman's `SitemapTree`](https://github.com/algolia/frontman/blob/master/lib/frontman/sitemap_tree.rb) in TypeScript.

SitemapTree is a data structure to represent pages from a static site. It provides a way to retrieve any resource from the tree with constant time complexity.

## Install

```sh
npm install @sarahdayan/sitemaptree
# or
yarn add @sarahdayan/sitemaptree
```

## Usage

```ts
import { SitemapTree, Resource } from 'sitemaptree'

const tree = new SitemapTree()

tree.add(new Resource('path/to/first.md'))
tree.add(new Resource('path/to/second.md'))

tree.children[0].children[0].children[0].source // "path/to/first.md"
```

## API

### `SitemapTree.resources`

> `Resource | null`

The attached resource.

### `SitemapTree.parent`

> `SitemapTree | null`

The parent of the sitemap tree.

### `SitemapTree.children`

> `SitemapTree[]`

The children of the sitemap tree.

### `SitemapTree.url`

> `string | null`

The URL of the sitemap tree.

### `SitemapTree.urlPart`

> `string | null`

The URL part of the sitemap tree.

### `SitemapTree.siblings`

> `SitemapTree[]`

The siblings of the sitemap tree, including itself.

### `SitemapTree.allUrls`

> `Record<string, SitemapTree>`

All URLs in the sitemap tree.

### `SitemapTree.add(resource)`

> `(resource: Resource): void`

Add a resource to the sitemap tree.

### `SitemapTree.fromUrl(url)`

> `(url: string): SitemapTree`

Retrieve a sub-tree in a sitemap tree from a URL.

### `SitemapTree.fromResource(resource)`

> `(resource: Resource): SitemapTree`

Retrieve a sub-tree in a sitemap tree from a resource.
