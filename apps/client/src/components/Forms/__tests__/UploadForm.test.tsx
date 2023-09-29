import { vi } from 'vitest'
import { AuthProvider } from '@context/AuthContext'
import { NotificationProvider } from '@context/NotificationContext'
import { render, screen, fireEvent } from '@testing-library/react'
import UploadForm from '../UploadForm'

describe('UploadForm', () => {
  test('Should select csv file', () => {
    const mockOnSelectFile = vi.fn()
    render(<UploadForm onSelectFile={mockOnSelectFile} />, {
      wrapper: ({ children }) => (
        <NotificationProvider>
          <AuthProvider>{children}</AuthProvider>
        </NotificationProvider>
      ),
    })
    const fileInput = screen.getByLabelText('file')
    expect(fileInput).toBeInTheDocument()

    const csvFile = new File(['iPhone'], 'sample.csv', {
      type: 'text/csv',
    })

    fireEvent.change(fileInput, { target: { files: [csvFile] } })

    expect(mockOnSelectFile).toHaveBeenCalledWith(csvFile)
  })
})
