import path from 'path';

import { Resource } from '.';

export type SitemapTree = InstanceType<typeof Sitemap>;

function addParts(
  tree: Sitemap,
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
    node = new Sitemap(currentPart, tree.urls);
    node.parent = tree;
    node.url = newUsedParts.join(path.sep);

    tree.urls[node.url] = node;
    tree.children.push(node);
  }

  addParts(node, otherParts, newUsedParts, resource);
}

class Sitemap {
  resource: Resource | null;
  parent: Sitemap | null;
  children: Sitemap[];
  url: string | null;
  urlPart: string | null;
  urls: Record<string, Sitemap>;

  constructor(
    urlPart: string | null = null,
    urls: Record<string, Sitemap> = {}
  ) {
    this.resource = null;
    this.parent = null;
    this.children = [];
    this.url = null;
    this.urls = urls;
    this.urlPart = urlPart;
  }

  get siblings() {
    return this.parent?.children || [this];
  }

  add(resource: Resource) {
    const parts = resource.destination.split(path.sep).filter(Boolean);

    addParts(this, parts, [], resource);
  }

  fromUrl(url: string) {
    return this.urls[url];
  }

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
}

export function sitemaptree(urlPart: string | null = null) {
  return new Sitemap(urlPart);
}
