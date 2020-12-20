import { Resource } from '.';

export class SitemapTree {
  resource: Resource | null;
  parent: SitemapTree | null;
  children: SitemapTree[];
  url: string | null;
  urlPart;

  private urls: Record<string, SitemapTree>;

  constructor(urlPart: string | null, urls?: Record<string, SitemapTree>) {
    this.resource = null;
    this.parent = null;
    this.children = [];
    this.url = null;
    this.urls = urls || {};
    this.urlPart = urlPart;
  }

  /**
   * Add a resource to the sitemap tree.
   *
   * @param resource The resource to add.
   */
  add(resource: Resource) {
    const parts = resource.destination.split('/').filter(Boolean);

    this.addParts(parts, [], resource);
  }

  /**
   * Retrieve a sub-tree in a sitemap tree from a URL.
   *
   * @param url The URL to retrieve the sub-tree from.
   */
  fromUrl(url: string) {
    return this.urls[url];
  }

  /**
   * Retrieve all siblings.
   */
  get siblings() {
    return this.parent?.children || [];
  }

  /**
   * Retrieve all URLs in the sitemap tree.
   */
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
