export default function OpenhouseSpeakerName({ name }: { name: string }) {
  const whitespaceIndices = []
  for (let i = 0; i < name.length; i++) {
    if (/\s/.test(name[i])) {
      whitespaceIndices.push(i)
    }
  }

  // No whitespace, return whole string
  if (whitespaceIndices.length === 0) {
    return <>{name}</>
  }

  const center = name.length / 2
  // Find the whitespace index closest to the center
  let closest = whitespaceIndices[0]
  let minDiff = Math.abs(closest - center)

  for (let i = 1; i < whitespaceIndices.length; i++) {
    const diff = Math.abs(whitespaceIndices[i] - center)
    if (diff < minDiff) {
      closest = whitespaceIndices[i]
      minDiff = diff
    }
  }

  const left = name.slice(0, closest).trim()
  const right = name.slice(closest + 1).trim()

  return (
    <>
      {left}
      <br />
      {right}
    </>
  )
}
