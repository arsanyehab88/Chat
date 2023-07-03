import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import pic from "../../assests/bot.jpeg"
import { useSignUpUserMutation } from '../../Redux/appApi'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useTheme } from '../../Theme/ThemeContext'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";




export default function SignUp() {

  const { t } = useTranslation()

  const navigate = useNavigate()


  //Image Upload
  let [signUpUser] = useSignUpUserMutation<any>()

  let [image, setImage] = useState<any>(null)

  const [errors, setError] = useState<any>(null)

  let [imagePreview, setImagePreview] = useState<string>('')

  const [isLoading, setIsloading] = useState<boolean>(false)

  const currentLanguagecode = Cookies.get('i18next')

  function ValditionImage(e: any) {
    const file = e.target.files[0]
    if (file.size > 20048576) return alert("Max file is save in limit");
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const { theme } = useTheme()

  //User
  interface Users {
    name: string;
    email: string;
    ProfilePic?: any;
    password: string;
  }


  let [user, setUser] = useState<Users>({ email: "", name: "", password: "", ProfilePic: File })
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      name: event.target.value,
    }));
  };


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: event.target.value,
    }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      password: event.target.value,
    }));
  };





  async function signUp() {
    setIsloading(true);
    const formData = new FormData();
    formData.append("email", user.email)
    formData.append("name", user.name)
    formData.append("password", user.password)
    formData.append('path', image);

    signUpUser(formData).then(({ data, error }: any) => {

      if (data?.message == "Done") {
        setIsloading(false)
        setError(null)
        localStorage.setItem('protect', 'true')
        navigate("/Chat/Home")
      }
      else {
        setIsloading(false)
        setError(error?.data?.message)
      }

    }).catch((e) => {
      setIsloading(false)
    })
  }



  

  const notify = () => toast.error(t('picture'), {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark" ,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!image) return notify()
    signUp()
  }




  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={currentLanguagecode == "ar" ? true : false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Container>
        <Row>
          <Col md={7} className="d-flex justify-content-center align-items-center flex-column">
            <Form onSubmit={handleSubmit}>
              <h1 className={theme == "light" ? "text-dark text-center" : "text-light text-center"}>{t("signUp.page")}</h1>
              <div className="signup-portfolio-pic-container">
                <img src={imagePreview || pic} alt="bot" className='signup-portfolio-pic' />
                <label htmlFor="image-upload" className="image-upload-label">
                  <i className="fas fa-plus-circle add-picture-icon"></i>
                </label>
                <input type="file" hidden id="image-upload" accept='image/png , image/jpeg' onChange={ValditionImage} />
              </div>
              {errors && <p className="alert alert-danger my-3">{errors}</p>}
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className={theme == "light" ? "text-dark" : "text-light"}>{t("signUp.name")}</Form.Label>
                <Form.Control className={theme == "dark" ? "custom-form-control" : ""} type="text" placeholder={t("signUp.name")} value={user.name} onChange={handleNameChange} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={theme == "light" ? "text-dark" : "text-light"}>{t('Login.email')}</Form.Label>
                <Form.Control className={theme == "dark" ? "custom-form-control" : ""} type="email" placeholder={t('Login.email')} onChange={handleEmailChange} value={user.email} required />
                <Form.Text className={theme == "light" ? "text-dark text-muted" : "text-light "}>{t('Login.email_main')}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className={theme == "light" ? "text-dark" : "text-light"}>{t('Login.password')}</Form.Label>
                <Form.Control className={theme == "dark" ? "custom-form-control" : ""} type="password" placeholder={t('Login.password')} value={user.password} onChange={handlePasswordChange} required />
              </Form.Group>
              <Button variant="primary" type="submit">
                {isLoading ? t('signUp.button2') : t('signUp.button')}
              </Button>
              <div className="py-4">
                <p className={theme == "light" ? "text-dark text-center" : "text-light text-center"}>
                  {t('signUp.main')} <Link to="/Chat/Login">{t('signUp.main2')}</Link>
                </p>
              </div>
            </Form>
          </Col>
          <Col md={5}>
            <div className="signup-bg"></div>
          </Col>
        </Row>
      </Container>
    </>

  )
}
