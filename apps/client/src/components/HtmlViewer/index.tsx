import styles from './index.module.scss'

const HTMLViewer = ({ html }: { html: string }) => {
  return <iframe className={styles.viewer} srcDoc={html} />
}

export default HTMLViewer
