import { useCallback } from 'react'
import { useKeyword } from '@hooks/useKeyword'
import List from '@components/List'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Uploader from '@components/Modal/Uploader'

const Skeleton = <Spinner animation='border' variant='primary' />

const KeywordPage = () => {
  const [keywords, renderCell, renderPreview, refreshList] = useKeyword()

  const renderCellItem = useCallback(
    (isProcessed: boolean, value: number | string | undefined) => {
      return renderCell(isProcessed, value, Skeleton)
    },
    [renderCell],
  )

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header className='d-flex p-3'>
            <h4>Keywords</h4>
            <Uploader onComplete={refreshList} />
          </Card.Header>
          <Table responsive striped bordered hover style={{ marginBottom: 0 }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Total Links</th>
                <th>Total Adwords</th>
                <th>Total Results</th>
                <th>Execution time</th>
                <th>HTML</th>
                <th>Processed</th>
              </tr>
            </thead>
            <tbody>
              <List
                items={keywords}
                renderItem={(keyword) => {
                  const { isProcessed } = keyword

                  return (
                    <tr key={keyword.id}>
                      <td>{keyword.id}</td>
                      <td>{keyword.keyword}</td>
                      <td>{renderCellItem(isProcessed, keyword.totalLinks)}</td>
                      <td>{renderCellItem(isProcessed, keyword.adWordsCount)}</td>
                      <td>{renderCellItem(isProcessed, keyword.resultsCount)}</td>
                      <td>{renderCellItem(isProcessed, keyword.executionTime)}</td>
                      <td>
                        {renderPreview(isProcessed, keyword.htmlPreview, Skeleton, (preview) => (
                          <Button target='_blank' href={preview} variant='success'>
                            View
                          </Button>
                        ))}
                      </td>
                      <td>
                        <Button variant={keyword.isProcessed ? 'success' : 'secondary'}>
                          {keyword.isProcessed ? 'Done' : 'Queued'}
                        </Button>
                      </td>
                    </tr>
                  )
                }}
              />
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  )
}

export default KeywordPage
