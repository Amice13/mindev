import type PizZip from 'pizzip'

export function addCustomProperty (zip: PizZip, { name, value }: { name: string, value: unknown}) {
  const CUSTOM_PATH = 'docProps/custom.xml'
  const RELS_PATH = '_rels/.rels'
  const CT_PATH = '[Content_Types].xml'
  const FMTID = '{D5CDD505-2E9C-101B-9397-08002B2CF9AE}'

  const escapeXml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')

  const serializeValue = (val: unknown) => {
    if (typeof val === 'number') {
      return `<vt:i4>${val}</vt:i4>`
    }
    if (typeof val === 'boolean') {
      return `<vt:bool>${val}</vt:bool>`
    }
    return `<vt:lpwstr>${escapeXml(JSON.stringify(val))}</vt:lpwstr>`
  }

  let xml = zip.file(CUSTOM_PATH)?.asText()

  if (!xml) {
    xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/custom-properties"
 xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
</Properties>`
  }

  // Extract existing pids
  const pidMatches = [...xml.matchAll(/pid="(\d+)"/g)]
  const nextPid =
    pidMatches.length > 0
      ? Math.max(...pidMatches.map(m => Number(m[1]))) + 1
      : 2

  const propertyXml = `
  <property pid="${nextPid}" name="${escapeXml(name)}" fmtid="${FMTID}">
    ${serializeValue(value)}
  </property>`

  xml = xml.replace('</Properties>', `${propertyXml}\n</Properties>`)

  zip.file(CUSTOM_PATH, xml)

  let rels = zip.file(RELS_PATH)?.asText()

  if (rels && !rels.includes('custom-properties')) {
    rels = rels.replace(
      '</Relationships>',
      `<Relationship
        Id="rIdCustomProps"
        Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties"
        Target="docProps/custom.xml"/>
</Relationships>`
    )
    zip.file(RELS_PATH, rels)
  }

  // ---- ensure content type ----
  let ct = zip.file(CT_PATH)?.asText()

  if (ct && !ct.includes('custom-properties+xml')) {
    ct = ct.replace(
      '</Types>',
      `<Override PartName="/docProps/custom.xml"
        ContentType="application/vnd.openxmlformats-officedocument.custom-properties+xml"/>
</Types>`
    )
    zip.file(CT_PATH, ct)
  }

  return zip
}
