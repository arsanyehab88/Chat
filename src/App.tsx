import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import MainLayOut from './Components/MainLayOut/MainLayOut';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Chat from './Pages/Chat/Chat';
import { useState } from 'react';
import { AppContext, socket } from './Components/Context/appContext';
import ChangePass from './Pages/ChangePassword/ChangePass';
import { ThemeProvider } from './Theme/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './assests/translation/translation';



function App() {
  const [rooms, setRooms] = useState<(number | string)[]>([])
  const [CurrentRoom, setCurrentRooms] = useState<(number | string)[]>([])
  const [members, setMembers] = useState<(number | string)[]>([])
  const [message, setMessage] = useState<(number | string)[]>([])
  const [PrivateMemberMessage, setPrivateMemberMessage] = useState<any>({})
  const [NewMessage, setNewMessage] = useState<any>({})



  
  


  function ProtectedRoutes(props: any) {
    if (localStorage.getItem('protect') === 'true') {
      return props.children
    } else {
      return <Navigate to="/Chat/Login" />
    }

  }


  let routes: any = createBrowserRouter([
    {
      path: "/Chat", element: <MainLayOut />, children: [
        {
          path: "/Chat/Home", element:
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
        },
        { path: "/Chat/Login", element: <Login /> },
        { path: "/Chat/SignUp", element: <SignUp /> },
        { path: "/Chat/Change", element: <ProtectedRoutes><ChangePass /> </ProtectedRoutes> },
        { index: true, element: <Chat /> }
      ]
    }
  ])


  return (
    <>
    
      <AppContext.Provider value={{ socket, CurrentRoom, setCurrentRooms, rooms, setRooms, members, setMembers, message, setMessage, PrivateMemberMessage, setPrivateMemberMessage, NewMessage, setNewMessage }}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <RouterProvider router={routes}/>
          </ThemeProvider>
        </I18nextProvider>
      </AppContext.Provider>


    </>
  );
}

export default App;
