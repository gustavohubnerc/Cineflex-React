import styled from "styled-components"
import { Link, useLocation } from "react-router-dom"

export default function SuccessPage() {

    const location = useLocation();

    const { title, date, sessionTime, ids, name, cpf, chosen } = location.state;

    const cpfFormated = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <div data-test="movie-info">
                    <strong><p>Filme e sessão</p></strong>
                    <p>{title}</p>
                    <p>{date} - {sessionTime}</p>
                </div>    
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                <div data-test="seats-info">
                    {chosen.map ( seat => (
                        <p key={seat}>Assento {seat}</p>
                    ))}
                </div>
            </TextContainer>

            <TextContainer>
                <div data-test="client-info">
                    <strong><p>Comprador</p></strong>
                    <p>Nome: {name}</p>
                    <p>CPF: {cpfFormated}</p>
                </div>
            </TextContainer>
            <Link to="/"><button data-test="go-home-btn">Voltar para Home</button></Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`