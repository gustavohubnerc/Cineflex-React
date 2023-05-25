import styled from "styled-components"
import { useState, useEffect } from "react";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import ReactLoading from "react-loading"

export default function SessionsPage() {

    const [sessions, setSessions] = useState([]);

    const { idFilme } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    useEffect ( () => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;

        const sessionRequest = axios.get(URL);

        sessionRequest.then((answer) => {
            console.log(answer.data);
            setSessions(answer.data);
            setIsLoading(false);          
        });
        console.log(sessions);  
        sessionRequest.catch(error => console.log(error.response.data));
        
    }, [idFilme]);

    return (
       
        <PageContainer>
        Selecione o horário
        {isLoading ? (
          <LoadingContainer>
            <ReactLoading type="spinningBubbles" color="#C3CFD9" height={100} width={100} />
          </LoadingContainer>
        ) : (
          <>
            {sessions.days?.map((session) => (
              <SessionContainer key={session.date}>
                <div data-test="movie-day">
                  {session.weekday} - {session.date}
                </div>
                <ButtonsContainer>
                  {session.showtimes.map((showtime) => (
                    <Link key={showtime.id} to={`/assentos/${showtime.id}`}>
                      <button data-test="showtime">{showtime.name}</button>
                    </Link>
                  ))}
                </ButtonsContainer>
              </SessionContainer>
            ))}
                <FooterContainer>
                    <div data-test="footer">
                        <img src={sessions.posterURL} alt={sessions.title} />
                    </div>
                    <div data-test="footer">
                        <p>{sessions.title}</p>
                    </div>
                </FooterContainer>
          </>
        )}
      </PageContainer>
      
        
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`

const LoadingContainer = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;