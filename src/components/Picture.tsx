import type { CSSProperties } from 'react'
import { images, type ImageName, type ImageSource } from '../generated/images'

type PictureProps = {
  name: ImageName
  alt: string
  sizes: string
  className?: string
  imgClassName?: string
  priority?: boolean
  style?: CSSProperties
}

const toSrcset = (list: readonly ImageSource[]) => list.map((s) => `${s.src} ${s.w}w`).join(', ')

/** <picture> responsivo com AVIF → WebP → JPG e placeholder borrado (LQIP). */
export function Picture({ name, alt, sizes, className, imgClassName = '', priority = false, style }: PictureProps) {
  const img = images[name]
  const fallback = img.jpg[Math.min(1, img.jpg.length - 1)]

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={toSrcset(img.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={toSrcset(img.webp)} sizes={sizes} />
      <img
        src={fallback.src}
        srcSet={toSrcset(img.jpg)}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
        style={{ backgroundImage: `url(${img.lqip})`, backgroundSize: 'cover', backgroundPosition: 'center', ...style }}
      />
    </picture>
  )
}

