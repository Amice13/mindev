export async function compressImage ({
  file,
  targetSize = 409_600,
  maxWidth = 1280,
  maxHeight = 1280,
  type = 'image/jpeg',
  maxIterations = 10,
}: {
  file: File
  targetSize?: number
  maxWidth?: number
  maxHeight?: number
  type?: string
  maxIterations?: number
}): Promise<File> {
  const imageBitmap = await createImageBitmap(file)

  let { width, height } = imageBitmap

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height)
    width = Math.round(width * ratio)
    height = Math.round(height * ratio)
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')!
  ctx.drawImage(imageBitmap, 0, 0, width, height)

  const toBlob = (quality: number) =>
    new Promise<Blob>(resolve => {
      canvas.toBlob(blob => resolve(blob!), type, quality)
    })

  let minQ = 0.1
  let maxQ = 1
  let bestBlob: Blob | null = null

  for (let i = 0; i < maxIterations; i++) {
    const q = (minQ + maxQ) / 2
    const blob = await toBlob(q)

    if (blob.size <= targetSize) {
      bestBlob = blob
      minQ = q
    } else {
      maxQ = q
    }
  }

  if (!bestBlob) {
    bestBlob = await toBlob(minQ)
  }

  return new File([bestBlob], file.name, {
    type: bestBlob.type,
    lastModified: Date.now(),
  })
}
