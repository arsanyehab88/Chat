import React, { useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useChangePassUserMutation } from '../../Redux/appApi';
import { useSelector } from 'react-redux';
import { useTheme } from '../../Theme/ThemeContext';
import { useTranslation } from 'react-i18next';






export default function ChangePass() {

    const user = useSelector((state: any) => state.user)

    interface passwordCahnges {
        password: string,
        Cpassword: string,
        _id: string
    }

    const { t } = useTranslation()


    const { theme } = useTheme()

    const [message, setMessage] = useState<string>()

    const [isLoading, setIsloading] = useState<boolean>(false)

    const [ChangePassword, setPassword] = useState<passwordCahnges>({ password: "", Cpassword: "", _id: user?._id })

    const [ChangePass] = useChangePassUserMutation<any>()

    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword((previous) => ({
            ...previous,
            password: event.target.value
        }))
    };

    const handleChangeCPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword((previous) => ({
            ...previous,
            Cpassword: event.target.value
        }))
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (ChangePassword.password == "" && ChangePassword.Cpassword == "") return
        setIsloading(true)
        await ChangePass(ChangePassword).then((data: any) => {
            if (data?.data?.message == "Done") {
                setMessage(data?.data?.message)

            }
            else {
                setMessage(data?.error?.data?.message)
            }
            setIsloading(false)
        }).catch((e) => {
            setIsloading(false)

        })
        setPassword({ password: "", Cpassword: "", _id: user?._id })
    }

    return (
        <Container>
            <Row>
                <Col md={5} className="login-bg "></Col>
                <Col md={7} className="d-flex justify-content-center align-items-center flex-column">
                    <Form className='forms' onSubmit={handleSubmit}>
                        {message && <p className="alert alert-danger my-3">{message}</p>}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className={theme == "light" ? "text-dark" : "text-light"}>{t('Login.password')}</Form.Label>
                            <Form.Control className={theme == "dark" ? "custom-form-control" : ""} type="password" placeholder={t('Login.password')} value={ChangePassword.password} onChange={handleChangePass} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCPassword">
                            <Form.Label className={theme == "light" ? "text-dark" : "text-light"}>{t('changepass_confirm')}</Form.Label>
                            <Form.Control className={theme == "dark" ? "custom-form-control" : ""} type="password" placeholder={t('changepass_confirm')} value={ChangePassword.Cpassword} onChange={handleChangeCPass} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='Title-chat'>
                            {isLoading ? <Spinner animation="grow" /> : t('change_submit')}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
