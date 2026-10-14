/**
 * Photo manifest for public/photos/ (built from the owner's uploads with
 * ffmpeg: AVIF + WebP + JPEG at each width). `fg` layers are alpha WebP
 * cut-outs (rembg isnet-general-use); `bg` plates have the subject inpainted.
 * Width/height give the intrinsic aspect ratio so nothing shifts on load.
 */
export interface PhotoSpec {
  name: string
  widths: readonly number[]
  width: number
  height: number
  /** 'all' = avif/webp/jpg; 'webp' = alpha cut-out, WebP only. */
  formats: 'all' | 'webp'
}

const p = (name: string, widths: number[], width: number, height: number, formats: PhotoSpec['formats'] = 'all'): PhotoSpec => ({
  name,
  widths,
  width,
  height,
  formats,
})

export const photos = {
  portrait: p('portrait', [600, 1200], 1200, 1800),
  lakesideBg: p('lakeside-bg', [600, 1200], 1200, 1600),
  lakesideFg: p('lakeside-fg', [600, 1200], 1200, 1600, 'webp'),
  london: p('london', [600, 1200], 1200, 1600),
  camad: p('camad', [800, 1280], 1280, 960),
  summit: p('summit', [800, 1600], 1600, 1067),
  tum: p('tum', [800], 800, 860),
  pwc: p('pwc', [800, 1280], 1280, 853),
  diploma: p('diploma', [800, 1600], 1600, 1066),
} as const

export type PhotoKey = keyof typeof photos
