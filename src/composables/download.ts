function download (buffer: ArrayBuffer, filename: string, mime = 'application/octet-stream') {
  const blob = new Blob([buffer], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function useDownload () {
  return { download }
}

export default useDownload
