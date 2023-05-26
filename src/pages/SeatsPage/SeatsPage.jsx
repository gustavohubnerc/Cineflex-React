import styled from "styled-components"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import ReactLoading from "react-loading"


export default function SeatsPage() {

    const navigate = useNavigate();

    const [ seats, setSeats ] = useState([]);

    const [ selected, setSelected ] = useState({ seats: [], ids: [] });

    const { idSessao } = useParams();

    const [ isLoading, setIsLoading ] = useState(true);

    const [ name, setName ] = useState('');

    const [ cpf, setCpf ] = useState('');

    useEffect (() => {

        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;

        const seatsRequest = axios.get(URL);

        seatsRequest.then((answer) => {
            setSeats(answer.data);
            setIsLoading(false);
        });

        seatsRequest.catch(error => console.log(error.response.data));
        
    }, [idSessao]);

    const handleSelectedSeats = (seat) => {
        if (seat.isAvailable) {
            if (selected.seats.includes(seat)) {
                setSelected(prevState => ({
                    seats: prevState.seats.filter(selectedSeat => selectedSeat.id !== seat.id),
                    ids: prevState.ids.filter(selectedId => selectedId !== seat.id)
                }));
            } else {
                setSelected(prevState => ({
                    seats: [...prevState.seats, seat],
                    ids: [...prevState.ids, seat.id]
                }));
            }
        } else {
            alert('Esse assento não está disponível');
        }
    }

    const finishRequest = (e) => {
        e.preventDefault();

        console.log(seats);

        const request = {
            ids: selected.ids, 
            name: name, 
            cpf: cpf,
            title: seats.movie.title,
            date: seats.day.date,
            sessionTime: seats.name 
        };

        const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";

        const promise = axios.post(url, request);

        promise.then( answer => {
            console.log(answer.data);
            navigate('/sucesso', {
                state: {
                    title: seats.movie.title,
                    date: seats.day.date,
                    sessionTime: seats.name,
                    ids: selected.ids, 
                    name: name,
                    cpf: cpf
                }
            });
            
        });
        promise.catch( error => console.log(error.response.data));

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
                            isSelected={selected.seats.includes(seat)}
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

                <FormContainer onSubmit={finishRequest}>
                    
                    <label htmlFor={name}>Nome do Comprador:</label>
                    <input 
                        type="text" 
                        id="name" 
                        data-test="client-name" 
                        placeholder="Digite seu nome..." 
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor={cpf}>CPF do Comprador:</label>
                    <input
                        type="number"
                        id="cpf"
                        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                        data-test="client-cpf"
                        placeholder="Digite seu CPF..."
                        value={cpf}
                        required
                        onChange={(e) => setCpf(e.target.value)}
                    />
                    <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>    

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
const FormContainer = styled.form`
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