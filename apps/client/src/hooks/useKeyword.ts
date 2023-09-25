import apiService from '@api/service'
import { baseURL } from '@constants/index'
import { TKeyword } from '@interfaces/keyword'
import { ReactNode, useEffect, useState } from 'react'

type TRenderCellFunction = (
  processed: boolean,
  value: string | number | undefined,
  skeleton: JSX.Element,
) => ReactNode

type TRenderButtonFunction = (
  processed: boolean,
  value: string | undefined,
  skeleton: JSX.Element,
  render: (link: string) => ReactNode,
) => ReactNode

export const useKeyword = (): [
  TKeyword[],
  TRenderCellFunction,
  TRenderButtonFunction,
  () => void,
] => {
  const [keywords, setKeywords] = useState<TKeyword[]>([])

  const renderCell: TRenderCellFunction = (processed, value, skeleton) => {
    return value ? value : processed ? '-' : skeleton
  }

  const renderPreview: TRenderButtonFunction = (processed, value, skeleton, render) => {
    const html = value?.replace(/.html/, '')
    const preview = `${baseURL}/api/keywords/preview/${html}`
    return value ? render(preview) : processed ? '-' : skeleton
  }

  const fetchKeywords = () => {
    apiService.getKeywords().then(setKeywords)
  }

  useEffect(() => {
    fetchKeywords()
  }, [])

  return [keywords, renderCell, renderPreview, fetchKeywords]
}
