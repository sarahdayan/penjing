import { Resource } from '.';

export class SitemapTree {
  resource: Resource | null;
  parent: SitemapTree | null;
  children: SitemapTree[];
  url: string | null;
  private urls: Record<string, SitemapTree>;
  urlPart;

  constructor(urlPart: string | null, urls?: Record<string, SitemapTree>) {
    this.resource = null;
    this.parent = null;
    this.children = [];
    this.url = null;
    this.urls = urls || {};
    this.urlPart = urlPart;
  }

  add(resource: Resource) {
    const parts = resource.destination.split('/').filter(Boolean);

    this.addParts(parts, [], resource);
  }

  fromUrl(url: string) {
    return this.urls[url];
  }

  get siblings() {
    return this.parent?.children || [];
  }

  get allUrls() {
    return this.urls;
  }

  private addParts(parts: string[], usedParts: string[], resource: Resource) {
    if (parts.length <= 0) {
      this.resource = resource;

      return;
    }

    const [currentPart, ...otherParts] = parts;
    const newUsedParts = [...usedParts, currentPart];
    const matchingChild = this.children.filter(
      child => child.urlPart === currentPart
    );

    let child = matchingChild.length ? matchingChild[0] : null;

    if (!child) {
      child = new SitemapTree(currentPart, this.urls);
      child.parent = this;
      child.url = newUsedParts.join('/');

      this.urls[child.url] = child;

      this.children.push(child);
    }

    child!.addParts(otherParts, newUsedParts, resource);
  }
}
