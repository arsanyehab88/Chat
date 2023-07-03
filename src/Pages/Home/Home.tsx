import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useTheme } from '../../Theme/ThemeContext'
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { theme } = useTheme()
  const { t } = useTranslation()
  return (
    <>

      <Container>
        <Row>
          <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
            <div className={theme === "light" ? "text-dark" : "text-light"}>
              <h1>{t('Home.title')}</h1>
              <p>{t('Home.main')}</p>
              <LinkContainer to="/Chat">
                <Button variant="success" className='Home-button'>
                  {t('Home.button')} <i className="fas fa-comments home-message-icon"></i>
                </Button>
              </LinkContainer>
            </div>
          </Col>
          <Col md={6}>
            <div className="home-bg"></div>
          </Col>
        </Row>
      </Container>
    </>

  )
}
