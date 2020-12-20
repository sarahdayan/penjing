import path from 'path';

import { Resource } from '.';

export class SitemapTree {
  private _resource: Resource | null;
  private _parent: SitemapTree | null;
  private _children: SitemapTree[];
  private _url: string | null;
  private _urlPart;
  private urls: Record<string, SitemapTree>;

  constructor(
    urlPart: string | null = null,
    urls?: Record<string, SitemapTree>
  ) {
    this._resource = null;
    this._parent = null;
    this._children = [];
    this._url = null;
    this.urls = urls || {};
    this._urlPart = urlPart;
  }

  /**
   * The attached resource.
   */
  get resource() {
    return this._resource;
  }

  /**
   * The parent of the sitemap tree.
   */
  get parent() {
    return this._parent;
  }

  /**
   * The children of the sitemap tree.
   */
  get children() {
    return this._children;
  }

  /**
   * The URL of the sitemap tree.
   */
  get url() {
    return this._url;
  }

  /**
   * The URL part of the sitemap tree.
   */
  get urlPart() {
    return this._urlPart;
  }

  /**
   * The siblings of the sitemap tree, including itself.
   */
  get siblings() {
    return this._parent?._children || [this];
  }

  /**
   * All URLs in the sitemap tree.
   */
  get allUrls() {
    return this.urls;
  }

  /**
   * Add a resource to the sitemap tree.
   *
   * @param resource The resource to add.
   */
  add(resource: Resource) {
    const parts = resource.destination.split(path.sep).filter(Boolean);

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
   * Retrieve a sub-tree in a sitemap tree from a resource.
   *
   * @param resource The resource to retrieve the sub-tree from.
   */
  fromResource(resource: Resource) {
    const leadingTrailingSeparators = new RegExp(
      `^${path.sep}|${path.sep}$`,
      'g'
    );

    return this.fromUrl(
      resource.destination.replace(leadingTrailingSeparators, '')
    );
  }

  private addParts(parts: string[], usedParts: string[], resource: Resource) {
    if (parts.length <= 0) {
      this._resource = resource;

      return;
    }

    const [currentPart, ...otherParts] = parts;
    const newUsedParts = [...usedParts, currentPart];
    const matchingChild = this._children.filter(
      child => child._urlPart === currentPart
    );

    let child = matchingChild.length ? matchingChild[0] : null;

    if (!child) {
      child = new SitemapTree(currentPart, this.urls);
      child._parent = this;
      child._url = newUsedParts.join(path.sep);

      this.urls[child._url] = child;

      this._children.push(child);
    }

    child!.addParts(otherParts, newUsedParts, resource);
  }
}
