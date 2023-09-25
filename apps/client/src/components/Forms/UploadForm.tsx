import { useAuth } from '@hooks/useAuth'
import { sampleCSV } from '@constants/index'
import Form from 'react-bootstrap/Form'

interface IFileSelect {
  onSelectFile: (file: File) => void
}

const UploadForm = ({ onSelectFile }: IFileSelect) => {
  const auth = useAuth()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onSelectFile(file)
  }

  return (
    <Form>
      <Form.Group className='mb-3'>
        <Form.Label>Uploader</Form.Label>
        <Form.Control type='email' value={auth.user?.email} disabled />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>CSV file</Form.Label>
        <Form.Control type='file' accept='text/csv, application/csv' onChange={handleFileChange} />
        <Form.Text id='passwordHelpBlock' muted>
          <a href={sampleCSV} target='_blank'>
            View sample
          </a>
        </Form.Text>
      </Form.Group>
    </Form>
  )
}

export default UploadForm
