import apiService from '@api/service'
import { TKeyword } from '@interfaces/keyword'
import { useEffect, useState, useCallback, ReactNode } from 'react'

type TRenderCellFunction = (
  processed: boolean,
  value: string | number | undefined,
  skeleton: JSX.Element,
) => ReactNode

type TRenderButtonFunction = (
  processed: boolean,
  value: number | undefined,
  skeleton: JSX.Element,
  render: () => ReactNode,
) => ReactNode

export const useKeyword = () => {
  const [keywords, setKeywords] = useState<TKeyword[]>([])

  const renderCell: TRenderCellFunction = (processed, value, skeleton) => {
    return value ? value : processed ? '-' : skeleton
  }

  const renderPreview: TRenderButtonFunction = (processed, value, skeleton, render) => {
    return value ? render() : processed ? '-' : skeleton
  }

  const fetchKeywords = () => {
    apiService.getKeywords().then(setKeywords)
  }

  const patchKeywords = useCallback(
    (payload: string) => {
      try {
        const changedKeyword: TKeyword = JSON.parse(payload)
        const latestKeywords = keywords.map((keyword) => {
          if (keyword.id === changedKeyword.id) {
            return { ...keyword, ...changedKeyword }
          }
          return keyword
        })
        setKeywords(latestKeywords)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[patchKeywords]', err)
      }
    },
    [keywords],
  )

  useEffect(() => {
    fetchKeywords()
  }, [])

  return {
    keywords,
    renderCell,
    renderPreview,
    patchKeywords,
    refreshList: fetchKeywords,
  }
}
