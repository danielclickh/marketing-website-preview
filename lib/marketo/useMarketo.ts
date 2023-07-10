import { useState, useEffect } from 'react'

declare global {
  interface Window {
    MktoForms2: {
      loadForm: (
        baseUrl: string,
        munchkinId: string,
        formId: string,
        callback: () => void
      ) => void
    }
  }
}

function appendScript(
  baseUrl: string,
  setScriptLoaded: React.Dispatch<React.SetStateAction<boolean>>
): void {
  if (window.MktoForms2) return setScriptLoaded(true)

  const script = document.createElement('script')
  script.src = `${baseUrl}/js/forms2/js/forms2.min.js`
  script.onload = () => (window.MktoForms2 ? setScriptLoaded(true) : null)
  document.body.appendChild(script)
}

function useMarketo({
  baseUrl,
  munchkinId,
  formId,
  callback
}: {
  baseUrl: string
  munchkinId: string
  formId: string
  callback: () => void
}): void {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (scriptLoaded) {
      window.MktoForms2.loadForm(baseUrl, munchkinId, formId, callback)
      return
    }
    appendScript(baseUrl, setScriptLoaded)
  }, [scriptLoaded, baseUrl, munchkinId, formId, callback])
}

export default useMarketo
