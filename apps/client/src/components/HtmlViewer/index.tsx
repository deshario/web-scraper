import { useEffect } from 'react'

const HTMLViewer = ({ html }: { html: string }) => {
  useEffect(() => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html

    let currentNonce = ''
    const injectedIdentifier: string[] = []
    const scripts = tempDiv.querySelectorAll('script')

    scripts.forEach((script, index) => {
      const newScript = document.createElement('script')
      const scriptNonce = script.getAttribute('nonce')
      if (scriptNonce && !currentNonce) {
        currentNonce = scriptNonce
      }

      if (script.src) {
        newScript.src = script.src
      } else {
        newScript.textContent = script.textContent
      }

      const identifier = `scraper-${index}`
      newScript.setAttribute('temp-script', identifier)

      document.head.appendChild(newScript)

      injectedIdentifier.push(identifier)
    })

    return () => {
      injectedIdentifier.forEach((identifier) => {
        const scriptToRemove = document.querySelector(`[temp-script="${identifier}"]`)
        if (scriptToRemove?.parentNode) {
          scriptToRemove.parentNode.removeChild(scriptToRemove)
        }
      })

      const scriptElements = document.querySelectorAll('script')
      scriptElements.forEach((script) => {
        const nonceValue = script.getAttribute('nonce')
        if (nonceValue === currentNonce && script?.parentNode) {
          script.parentNode.removeChild(script)
        }
      })

      tempDiv.remove()
    }
  }, [html])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default HTMLViewer
