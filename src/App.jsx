import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom"
import axios from "axios"
import { IonIcon } from "@ionic/react"
import { arrowBackOutline } from "ionicons/icons"


export default function App() {

    axios.defaults.headers.common['Authorization'] = 'EEqG94KF4FdeZUkmaT7pxWXj';

    return (
        <BrowserRouter>
        <NavContainer>
            <Navigation/>
        </NavContainer> 
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assentos/:idSessao" element={<SeatsPage />} />
            <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
            <Route path="/sucesso" element={<SuccessPage />} />
        </Routes>
        </BrowserRouter>
    );
}
function Navigation() {
    const navigate = useNavigate();

    const handleClickNavContainer = () => {
        navigate('/');
    };

    return (
        <>  
            <ReturnButton />
            <Link to="/" onClick={handleClickNavContainer}>CINEFLEX</Link>
        </>
    );
}


function ReturnButton() {
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleReturn = () => {
      navigate(-1);
    };
  
    return (
      location.pathname !== "/" && (
        <Button data-test="go-home-header-btn" onClick={handleReturn}>
          <IonIcon icon={arrowBackOutline} />
        </Button>
      )
    );
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`

const Button = styled.button`
    width: 60px;
    height: 60px;
    background-color: #E8833A;
    color: #C3CFD9;
    border-radius: 50px;
    border: none;
    position: fixed;
    top: 5px;
    left: 5px;
    z-index: 1;
`
