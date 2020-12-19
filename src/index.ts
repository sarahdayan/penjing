import fs from 'fs';
import path from 'path';

export class Resource {
  source;
  destination;
  data;

  constructor(sourcePath: string, destinationPath?: string) {
    if (fs.existsSync(sourcePath)) {
      this.source = sourcePath;
      this.destination = this.toDestinationPath(destinationPath || sourcePath);
      this.data = this.parse(sourcePath);

      return;
    }

    throw new Error('This file does not exist.');
  }

  private parse(filePath: string) {
    return fs.readFileSync(filePath, 'utf8');
  }

  private toDestinationPath(filePath: string) {
    const { dir, name } = path.parse(filePath.replace(/^\//g, ''));

    return `/${path.join(dir, name)}/`;
  }
}

export class SitemapTree {
  resource: Resource | null;
  parent: SitemapTree | null;
  children: SitemapTree[];
  url: string | null;
  urlPart;

  constructor(urlPart: string | null) {
    this.resource = null;
    this.parent = null;
    this.children = [];
    this.url = null;
    this.urlPart = urlPart;
  }

  add(resource: Resource) {
    const parts = resource.destination.split('/').filter(Boolean);

    this.addParts(parts, [], resource);
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
      child = new SitemapTree(currentPart);
      child.parent = this;
      child.url = newUsedParts.join('/');

      this.children.push(child);
    }

    child!.addParts(otherParts, newUsedParts, resource);
  }
}
