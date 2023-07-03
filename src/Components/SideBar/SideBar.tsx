import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppContext } from '../Context/appContext'
import { Col, ListGroupItem, Row } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { addNotifications, resetNotifications } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../Theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import Cookies from "js-cookie";



export default function SideBar() {

    const currentLanguagecode = Cookies.get('i18next') || "en"



    const { theme } = useTheme()

    const user = useSelector((state: any) => state.user)
    const room: string[] = ['general', 'tech', 'finance', 'crypto'];
    const dispath = useDispatch()
    const { socket, CurrentRoom, setCurrentRooms,  members, setMembers,  PrivateMemberMessage, setPrivateMemberMessage }: any = useContext(AppContext)

    const { t } = useTranslation()

    function joinRooms(room: any, isPublic: boolean) {
        if (!user) {
            alert("please Login")
        }
        socket.emit('join-room', room, CurrentRoom)
        setCurrentRooms(room)

        if (isPublic) {
            setPrivateMemberMessage(null)
        }

        //dispatch notification
        dispath(resetNotifications(room))

    }
    socket.off("notifications").on("notifications", (room: any) => {
        if (CurrentRoom != room) dispath(addNotifications(room))

    })



    useEffect(() => {
        if (!user) return

        socket.emit("join-room", "general");
        socket.emit("new-user");
        setCurrentRooms("general");


    }, []);

    useEffect(() => {
        socket.off("new-user").on("new-user", (payload: any) => {
            setMembers(payload);
        });
    }, [])





    function orderIds(id1: string, id2: string) {
        if (id1 > id2) {
            return id1 + '-' + id2
        } else {
            return id2 + '-' + id1
        }
    }

    function handleprivateMessage(member: any) {
        setPrivateMemberMessage(member)
        const roomId = orderIds(user?._id, member?._id)
        joinRooms(roomId, false)
    }






    if (!user) return <></>
    return (
        <>
            <h2 className={theme == "light" ? "text-dark Title-chat" : "text-light Title-chat"}>{t('chat.title')}</h2>

            <ListGroup className={theme == "dark" ? 'custom-list-group-Dark Title-chat' : 'Title-chat'}>
                {room.map((room, i) => (
                    <ListGroup.Item key={i} onClick={() => { joinRooms(room, true) }} className='d-flex justify-content-between' active={room == CurrentRoom} style={{ cursor: "pointer" }}>

                        {room}{CurrentRoom != room && <span className='badge rounded-pill bg-primary '>{user?.newMessages[room]}</span>}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <h2 className={theme == "light" ? "text-dark Title-chat" : "text-light Title-chat"}>{t('chat.main')}</h2>
            <ListGroup className={theme == "dark" ? 'custom-list-group-Dark ' : ''}>
                {members.map((member: any, i: number) => (

                    <ListGroupItem key={i} style={{ cursor: "pointer" }} active={PrivateMemberMessage?._id == member?._id} disabled={member?._id === user?._id} onClick={() => handleprivateMessage(member)}>
                        <Row>
                            <Col xs={2} className='member-status'>
                                <img src={member?.ProfilePic} alt="profile" className='profile-picture' />
                                {member?.status === 'online' ? <i className={currentLanguagecode !="ar" ? 'fas fa-circle online-status':'fas fa-circle online-statusAR'}></i> : <i className={currentLanguagecode !="ar" ? 'fas fa-circle offline-status':'fas fa-circle offline-statusAR'}></i>}
                            </Col>
                            <Col xs={9}>
                                {member.name}
                                {member._id === user?._id && '('+t('chat.you')+')'  }
                                {member.status == "offline" &&'('+ t('chat.offline')+')'}
                            </Col>
                            <Col xs={1}>
                                <span className='badge rounded-pill bg-primary '>{user?.newMessages[orderIds(member?._id, user?._id)]}</span>
                            </Col>
                        </Row>

                    </ListGroupItem>
                ))}
            </ListGroup>
        </>
    )
}
