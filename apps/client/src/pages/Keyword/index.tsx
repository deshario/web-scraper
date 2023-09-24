import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

const Loader = () => {
  return <Spinner animation='border' variant='primary' />
}

const KeywordPage = () => {
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header className='market-header'>
            <h4>Keywords</h4>
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
              <tr>
                <td>1</td>
                <td>Banana</td>
                <td>20</td>
                <td>-</td>
                <td>54,000,000</td>
                <td>0.52s</td>
                <td>
                  <Button variant='success'>View</Button>
                </td>
                <td>true</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Carrot</td>
                <td>50</td>
                <td>-</td>
                <td>34,340,000</td>
                <td>0.52s</td>
                <td>
                  <Button variant='success'>View</Button>
                </td>
                <td>true</td>
              </tr>
              <tr>
                <td>3</td>
                <td>iPhone</td>
                <td>
                  <Loader />
                </td>
                <td>
                  <Loader />
                </td>
                <td>
                  <Loader />
                </td>
                <td>
                  <Loader />
                </td>
                <td>
                  <Loader />
                </td>
                <td>false</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  )
}

export default KeywordPage
