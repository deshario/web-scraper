import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IRegisterForm } from 'src/interfaces'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface IForm {
  onSubmit: (formData: IRegisterForm) => void
}

const formikConfig = {
  initialValues: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  }),
}

const RegisterForm = ({ onSubmit }: IForm) => {
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
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          name='username'
          placeholder='Enter username'
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={formik.touched.username && !!formik.errors.username}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.touched.username && formik.errors.username ? formik.errors.username : null}
        </Form.Control.Feedback>
      </Form.Group>
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
      <Form.Group className='mb-3'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.touched.confirmPassword && formik.errors.confirmPassword
            ? formik.errors.confirmPassword
            : null}
        </Form.Control.Feedback>
      </Form.Group>
      <Row className='justify-content-end'>
        <Col xs='auto'>
          <Button variant='primary' type='submit'>
            Register
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default RegisterForm
