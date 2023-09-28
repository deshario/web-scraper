import apiService from '@api/service'
import { useEffect, useState } from 'react'

const useViewer = (contentId: number | null) => {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    if (contentId) {
      apiService.getKeywordHtmlContent(contentId).then((res) => {
        if (res) setHtmlContent(res.htmlContent)
      })
    }
  }, [contentId])

  return htmlContent
}

export default useViewer
