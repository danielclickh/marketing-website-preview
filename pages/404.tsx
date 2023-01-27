import '../styles/globals.scss'
export default function NotFound() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
      <div>
        <h1
          style={{
            textAlign: 'center',
            fontSize: '12rem',
            marginTop: '0',
            marginBottom: '1rem',
            fontWeight: 500
          }}>
          404
        </h1>
        <h2>This page could not be found.</h2>
      </div>
    </div>
  )
}
