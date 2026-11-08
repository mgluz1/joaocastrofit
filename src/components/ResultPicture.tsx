import type { CSSProperties } from 'react'
import type { ImageEntry, ImageSource } from '../generated/images'

type ResultPictureProps = {
  image: ImageEntry
  alt: string
  sizes: string
  imgClassName?: string
  style?: CSSProperties
}

const toSrcset = (list: readonly ImageSource[]) => list.map((s) => `${s.src} ${s.w}w`).join(', ')

/** <picture> responsivo (AVIF → WebP → JPG) para as fotos de resultados, com LQIP. */
export function ResultPicture({ image, alt, sizes, imgClassName = '', style }: ResultPictureProps) {
  const fallback = image.jpg[Math.min(1, image.jpg.length - 1)]

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={toSrcset(image.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={toSrcset(image.webp)} sizes={sizes} />
      <img
        src={fallback.src}
        srcSet={toSrcset(image.jpg)}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={imgClassName}
        style={{ backgroundImage: `url(${image.lqip})`, backgroundSize: 'cover', backgroundPosition: 'center', ...style }}
      />
    </picture>
  )
}

