import React from 'react'
import Markdown from '../components/Markdown'
function dummy(props) {
  let dummyValue =
    'testValue\n # Test Header Value h1\n ## Test Header Value h2\n ### Test Header  Value h3\n #### Test Header Value h4\n ##### Test Header Value h5\n ###### Test Header Value h6\n'
  dummyValue += `
1. First item
2. Second item
3. Third item
4. Fourth item

- First item
- Second item
- Third item
- Fourth item
`
  return (
    <div>
      <Markdown children={dummyValue} className='rich-text-content' />
    </div>
  )
}

export default dummy
