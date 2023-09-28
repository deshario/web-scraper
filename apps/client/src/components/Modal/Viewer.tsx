import HTMLViewer from '@components/HtmlViewer'
import useViewer from '@hooks/useViewer'
import Modal from 'react-bootstrap/Modal'

interface IViewer {
  contentId: number | null
  dismiss: () => void
}

const Viewer = ({ contentId, dismiss }: IViewer) => {
  const htmlContent = useViewer(contentId)

  return (
    <Modal show={!!contentId} fullscreen={true} onHide={dismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <HTMLViewer html={htmlContent} />
      </Modal.Body>
    </Modal>
  )
}

export default Viewer
