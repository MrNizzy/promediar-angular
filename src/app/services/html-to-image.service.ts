import { Injectable } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { ImageType } from '../models/image.interface';

@Injectable({
  providedIn: 'root',
})
export class HtmlToImageService {
  public downloadImage(
    content: HTMLElement,
    filename: string,
    imageType: ImageType
  ) {
    switch (imageType) {
      case ImageType.PNG:
        this.toPng(content, filename);
        break;
      case ImageType.JPEG:
        this.toJpeg(content, filename);
        break;
      case ImageType.SVG:
        this.toSvg(content, filename);
        break;
      default:
        console.error('Image type not supported');
    }
  }

  private download(dataUrl: string, filename: string) {
    const img = new Image();
    img.src = dataUrl;
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    link.remove();
  }

  private async toJpeg(content: HTMLElement, filename: string) {
    await htmlToImage
      .toJpeg(content, {
        fontEmbedCSS: 'false',
      })
      .then((dataUrl) => {
        this.download(dataUrl, filename);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }

  private async toSvg(content: HTMLElement, filename: string) {
    await htmlToImage
      .toSvg(content, {
        fontEmbedCSS: 'false',
      })
      .then((dataUrl) => {
        this.download(dataUrl, filename);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }

  private async toPng(content: HTMLElement, filename: string) {
    await htmlToImage
      .toPng(content, {
        fontEmbedCSS: 'false',
      })
      .then((dataUrl) => {
        this.download(dataUrl, filename);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }
}
