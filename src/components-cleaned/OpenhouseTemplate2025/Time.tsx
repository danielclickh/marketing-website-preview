export interface OpenhouseTimeProps {
  time: string
}

export default function OpenhouseTime({ time }: OpenhouseTimeProps) {
  const [hours, minutes] = time.split(':')
  let hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 || 12 // Convert 0 to 12 for midnight
  return (
    <>
      {hour}:{minutes}
      {ampm}
    </>
  )
}
