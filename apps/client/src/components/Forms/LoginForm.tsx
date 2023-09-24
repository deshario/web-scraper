import * as Yup from 'yup'
import { useFormik } from 'formik'
import { ILoginForm } from 'src/interfaces'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface IForm {
  onSubmit: (formData: ILoginForm) => void
}

const formikConfig = {
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  }),
}

const LoginForm = ({ onSubmit }: IForm) => {
  const { initialValues, validationSchema } = formikConfig
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values)
    },
  })

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter email address'
          onChange={formik.handleChange}
          value={formik.values.email}
          isInvalid={formik.touched.email && !!formik.errors.email}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.touched.email && formik.errors.email ? formik.errors.email : null}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          placeholder='Password'
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={formik.touched.password && !!formik.errors.password}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.touched.password && formik.errors.password ? formik.errors.password : null}
        </Form.Control.Feedback>
      </Form.Group>
      <Row className='justify-content-end'>
        <Col xs='auto'>
          <Button variant='primary' type='submit'>
            Login
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default LoginForm
