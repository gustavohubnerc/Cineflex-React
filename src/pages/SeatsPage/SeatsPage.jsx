import styled from "styled-components"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import ReactLoading from "react-loading"


export default function SeatsPage() {

    const [ seats, setSeats ] = useState([]);

    const [ selected, setSelected ] = useState([]);

    const [ isAvailable, setIsAvailable ] = useState([]);

    const { idSessao } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {

        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;

        const seatsRequest = axios.get(URL);

        seatsRequest.then((answer) => {
            console.log(answer.data);
            setSeats(answer.data);
            setIsLoading(false);
        });

        seatsRequest.catch(error => console.log(error.response.data));
        
    }, [idSessao]);

    const handleSelectedSeats = (seat) => {
        if(seat.isAvailable) {
            if (selected.includes(seat)) {
                setSelected(selected.filter(selectedSeat => selectedSeat.id !== seat.id));
            } else {
                setSelected([...selected, seat]);
            }
        } else {
            alert('Esse assento não está disponível')
        }
    }

    return (
        <PageContainer>
            {isLoading ? (
                <LoadingContainer>
                    <ReactLoading type="spinningBubbles" color="#C3CFD9" height={100} width={100}/>
                </LoadingContainer>
            ) : (
                <>
                Selecione o(s) assento(s)
            
                <SeatsContainer>
                {seats.seats?.map( seat => (
                    <div data-test="seat" key={seat.name}>
                        <SeatItem 
                        onClick={() => handleSelectedSeats(seat)}
                        isSelected={selected.includes(seat)}
                        isAvailable={seat.isAvailable}
                        >
                            <div>{seat.name}</div>
                        </SeatItem>
                    </div>
                ))}
                </SeatsContainer>
            
                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle isSelected />
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle isAvailable/>
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle/>
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>

                <FormContainer>
                    Nome do Comprador:
                    <input data-test="client-name" placeholder="Digite seu nome..." />

                    CPF do Comprador:
                    <input data-test="client-cpf" placeholder="Digite seu CPF..." />
                    <Link key={seats.id} to={'/sucesso'}>
                        <button data-test="book-seat-btn">Reservar Assento(s)</button>
                    </Link>     
                    
                </FormContainer>

                <FooterContainer>
                    <div data-test="footer">
                        <div>
                            <img src={seats.movie && seats.movie.posterURL} alt="poster" />
                        </div>
                        <div>
                            <p>{seats.movie && seats.movie.title}</p>
                            <p>
                                {seats.movie && seats.name} - {seats.movie && seats.day.weekday}  
                            </p>
                        </div>
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
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props =>
      props.isSelected ? '#0E7D71' : props.isAvailable ? '#7B8B99' : '#F7C52B'};
    background-color: ${props =>
      props.isSelected ? '#1AAE9E' : props.isAvailable ? '#C3CFD9' : '#FBE192'};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${props => 
    props.isAvailable ? (props.isSelected ? '#0E7D71' : '#7B8B99') : '#F7C52B'};    
    background-color:  ${props =>
    props.isAvailable ? (props.isSelected ? '#1AAE9E' : '#C3CFD9') : '#FBE192'};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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