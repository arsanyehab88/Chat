import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppContext } from '../Context/appContext'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useTheme } from '../../Theme/ThemeContext'
import { useTranslation } from 'react-i18next'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Cookies from 'js-cookie'


export default function MessageForm() {

  const { t } = useTranslation()

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const currentLanguagecode = Cookies.get('i18next') || "en"

  //get User In Local Storage
  const user = useSelector((state: any) => state.user)
  let [messages, setMessages] = useState<string>('')
  const messageEndRef: any = useRef(null)
  //Context
  const { socket, CurrentRoom, setMessage, message, PrivateMemberMessage }: any = useContext(AppContext)

  const { theme } = useTheme()

  useEffect(() => {
    scrollToBottom()
  }, [message])
  //Format Date
  function getFormDate() {
    const date = new Date()
    const year = date.getFullYear()
    let month = (1 + date.getMonth()).toString()

    month = month.length > 1 ? month : "0" + month
    let day = date.getDate().toString()
    return month + "/" + day + "/" + year
  }

  // Handle change in input text
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessages(event.target.value)
  };

  //use function FormDate
  const todayDate = getFormDate()


  socket.off("room-messages").on("room-messages", (roomMessages: any) => {
    setMessage(roomMessages)
  })


  function scrollToBottom() {
    messageEndRef?.current.scrollIntoView({ behavior: "smooth" })
  }

  //handle on submit to send message
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!messages) return;

    const today = new Date()

    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()

    const time = today.getHours() + ":" + minutes

    const roomId = CurrentRoom

    socket.emit("message-room", roomId, messages, user, time, todayDate)
    setMessages("")
  }



  return (
    <>
      <div className="message-output Title-chat ">
        {user && !PrivateMemberMessage?._id && <div className='alert alert-primary rounded-0'>You are In The {CurrentRoom} Room</div>}
        {user && PrivateMemberMessage?._id && (
          <>
            <div className='alert alert-info conversation-info'>
              <div>
                {t('chat.title-conv')} {PrivateMemberMessage?.name} <img alt="profile_picture" src={PrivateMemberMessage?.ProfilePic} className='conversation-pic' />
              </div>
            </div>
          </>

        )}
        {!user && <div className='alert rounded-0 alert-danger'>{t('chat.message_title')}</div>}

        {user && message?.map(({ _id: date, messagesByDate }: any, i: number) => (
          <div key={i}>
            <p className='alert alert-info text-center message-date-indicator'>
              {date}
            </p>
            {messagesByDate?.map(({ content, time, from: sender }: any, idx: number) => (
              <div className={sender?.email === user?.email ? "message" : "incoming-message"} key={idx}>
                <div className="message-inner">
                  <div className="d-flex align-items-center mb-3">
                    <img src={sender?.ProfilePic} className='message-pic' alt="" />
                    <p className='message-sender'>{sender?._id === user._id ? t('chat.you') : sender?.name}</p>
                  </div>
                  <p className='message-content'> {content} </p>
                  <p className='message-time'>{time}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className=' mb-3'>
          <Col md={10}>
            <Form.Group>
              <Form.Control type="text" placeholder={t('chat.message_input')} className={theme === "dark" ? "custom-form-control" : ""} onChange={handleChange} value={messages}></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1} className=' position-relative'>
            <div className={currentLanguagecode == "ar" ? (showEmojiPicker ? "d-block emojiAR " : "d-none") : (showEmojiPicker ? "d-block emoji " : "d-none")}>
              <Picker data={data} previwPosition="none" onEmojiSelect={(e: any) => {
                setMessages(prevent => prevent + e.native)
                setShowEmojiPicker(!showEmojiPicker)
              }} />
            </div>
            <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className='btn-emoji'>😀</Button>
          </Col>
          <Col md={1}>
            <Form.Group>
              <Button variant="primary" type="submit" style={{ width: "100%", backgroundColor: "orange" }} className='Title-chat' disabled={!user}>
                <i className="fas fa-paper-plane"></i>
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>

  )
}
