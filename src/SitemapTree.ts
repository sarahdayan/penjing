import path from 'path';

import { Resource } from '.';

function addParts(
  tree: SitemapTree,
  parts: string[],
  usedParts: string[],
  resource: Resource
) {
  if (parts.length <= 0) {
    tree.resource = resource;

    return;
  }

  const [currentPart, ...otherParts] = parts;
  const newUsedParts = [...usedParts, currentPart];

  let node = tree.children.find(({ urlPart }) => urlPart === currentPart);

  if (!node) {
    node = new SitemapTree(currentPart, tree.allUrls);
    node.parent = tree;
    node.url = newUsedParts.join(path.sep);

    tree.allUrls[node.url] = node;
    tree.children.push(node);
  }

  addParts(node, otherParts, newUsedParts, resource);
}

export class SitemapTree {
  /**
   * The attached resource.
   */
  resource: Resource | null;
  /**
   * The parent of the sitemap tree.
   */
  parent: SitemapTree | null;
  /**
   * The children of the sitemap tree.
   */
  children: SitemapTree[];
  /**
   * The URL of the sitemap tree.
   */
  url: string | null;
  /**
   * All URLs in the sitemap tree.
   */
  allUrls: Record<string, SitemapTree>;
  /**
   * The URL part of the sitemap tree.
   */
  urlPart: string | null;

  constructor(urlPart: string | null, urls: Record<string, SitemapTree>) {
    this.resource = null;
    this.parent = null;
    this.children = [];
    this.url = null;
    this.allUrls = urls;
    this.urlPart = urlPart;
  }

  /**
   * The siblings of the sitemap tree, including itself.
   */
  get siblings() {
    return this.parent?.children || [this];
  }

  /**
   * Add a resource to the sitemap tree.
   *
   * @param resource The resource to add.
   */
  add(resource: Resource) {
    const parts = resource.destination.split(path.sep).filter(Boolean);

    addParts(this, parts, [], resource);
  }

  /**
   * Retrieve a sub-tree in a sitemap tree from a URL.
   *
   * @param url The URL to retrieve the sub-tree from.
   */
  fromUrl(url: string) {
    return this.allUrls[url];
  }

  /**
   * Retrieve a sub-tree in a sitemap tree from a resource.
   *
   * @param resource The resource to retrieve the sub-tree from.
   */
  fromResource(resource: Resource) {
    const separator = path.sep === '/' ? '/' : '\\\\';
    const leadingTrailingSeparators = new RegExp(
      `^${separator}|${separator}$`,
      'g'
    );

    return this.fromUrl(
      resource.destination.replace(leadingTrailingSeparators, '')
    );
  }

  /**
   * Create a sitemap tree.
   */
  static create() {
    return new SitemapTree(null, {});
  }
}
