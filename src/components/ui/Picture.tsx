import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { photos, type PhotoKey } from '@/data/photos'
import { cn, photoSrc, srcSet } from '@/lib/utils'

interface PictureProps {
  photo: PhotoKey
  alt: string
  sizes: string
  className?: string
  imgClassName?: string
  imgStyle?: CSSProperties
  priority?: boolean
  /** Skeleton reveal (transitions.dev) while the file streams in. */
  reveal?: boolean
}

/**
 * <picture> for a photo in public/photos/: AVIF → WebP → JPEG (or alpha WebP
 * for cut-outs), intrinsic size set so layout never shifts.
 */
export default function Picture({
  photo,
  alt,
  sizes,
  className,
  imgClassName,
  imgStyle,
  priority = false,
  reveal = true,
}: PictureProps) {
  const spec = photos[photo]
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) setLoaded(true)
  }, [])

  const img = (
    <picture>
      {spec.formats === 'all' && <source type="image/avif" srcSet={srcSet(spec.name, spec.widths, 'avif')} sizes={sizes} />}
      <source type="image/webp" srcSet={srcSet(spec.name, spec.widths, 'webp')} sizes={sizes} />
      <img
        ref={imgRef}
        src={photoSrc(spec.name, spec.widths, spec.formats === 'all' ? 'jpg' : 'webp')}
        alt={alt}
        width={spec.width}
        height={spec.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...{ fetchpriority: priority ? 'high' : 'auto' }}
        onLoad={() => setLoaded(true)}
        className={cn('block h-full w-full object-cover', imgClassName)}
        style={imgStyle}
        draggable={false}
      />
    </picture>
  )

  if (!reveal) return <div className={className}>{img}</div>

  return (
    <div className={cn('t-skel', loaded && 'is-revealed', className)}>
      <div className={cn('t-skel-skeleton', !loaded && 'is-pulsing')} aria-hidden="true">
        <div className="h-full w-full bg-raised" />
      </div>
      <div className="t-skel-content">{img}</div>
    </div>
  )
}
