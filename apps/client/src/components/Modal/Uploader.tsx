import apiService from '@api/service'
import UploadForm from '@components/Forms/UploadForm'
import { useNotification } from '@hooks/useNotification'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface IUpload {
  onComplete: () => void
}

const Uploader = ({ onComplete }: IUpload) => {
  const [show, setShow] = useState(false)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const { pushNotification } = useNotification()

  const toggleShow = () => setShow(!show)

  const uploadKeyword = async () => {
    if (csvFile) {
      await apiService.uploadKeyword(csvFile)
      onComplete()
      pushNotification({
        message: 'Upload Success',
        type: 'success',
      })
    }
    toggleShow()
  }

  return (
    <>
      <Button variant='primary' onClick={toggleShow} className='ms-3'>
        Upload
      </Button>

      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Upload keyword</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadForm onSelectFile={setCsvFile} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={toggleShow}>
            Dismiss
          </Button>
          <Button variant='primary' onClick={uploadKeyword}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Uploader
