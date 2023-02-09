import SeoContainer from '../../components/SeoContainer'

function Head() {
  return (
    <>
      <meta
        http-equiv='Content-Security-Policy'
        content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com"></meta>
      <SeoContainer title='Learn | ClickHouse' />
    </>
  )
}

export default Head
