import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignINUserMutation } from '../../Redux/appApi';
import { AppContext } from '../../Components/Context/appContext';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTheme } from '../../Theme/ThemeContext';
import { useTranslation } from 'react-i18next';



export default function Login() {

  const {t}=useTranslation()

  const [SignINUser, { Loading }] = useSignINUserMutation<any>()
  interface Users {
    email: string;
    password: string;
  }
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [errors, setError] = useState<any>(null)
  const naviagate = useNavigate()
  const { socket }: any = useContext(AppContext)

  let [user, setUser] = useState<Users>({ email: "", password: "" })

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: event.target.value,
    }));
  };

  const { theme } = useTheme()

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      password: event.target.value,
    }));
  };

  async function signIN(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsloading(true);
    SignINUser(user).then(({ data, error }: any) => {
      if (data?.message === "Done") {
        socket.emit("new-user")
        setIsloading(false)
        setError(null)
        localStorage.setItem('protect', 'true')
        naviagate("/Chat/Home")
      } else {
        setIsloading(false)
        setError(error?.data?.message)
      }
    }).catch((error) => {
      setIsloading(false)
    })

  }


  return (
    <Container >
      <Row>
        <Col md={5} className="login-bg "></Col>
        <Col md={7} className="d-flex justify-content-center align-items-center flex-column">
          <Form className='forms' onSubmit={signIN}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {errors && <p className="alert alert-danger">{errors}</p>}
              <Form.Label className={theme == "light" ? "text-dark" : "text-light"}>{t('Login.email')}</Form.Label>
              <Form.Control className={theme == "dark" ? "custom-form-control" : ""} type="email" placeholder={t('Login.email')} onChange={handleEmailChange} value={user.email} required />
              <Form.Text className={theme == "light" ? "text-dark text-muted" : "text-light "}>{t('Login.email_main')}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className={theme == "light" ? "text-dark" : "text-light"}>{t('Login.password')}</Form.Label>
              <Form.Control className={theme == "dark" ? "custom-form-control" : ""} type="password" placeholder={t('Login.password')} value={user.password} onChange={handlePasswordChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLoading ? <Spinner animation="grow" /> : t('Login.button')}
            </Button>
            <div className="py-4">
              <p className={theme == "light" ? "text-dark text-center" : "text-light text-center"}>
                {t('Login.main')} <Link to="/Chat/signup">{t('Login.main')}</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
