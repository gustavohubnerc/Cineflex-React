import styled from "styled-components"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import ReactLoading from 'react-loading'

export default function HomePage() {

    const [movies, setMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        
        const URL = "https://mock-api.driven.com.br/api/v8/cineflex/movies";

        const moviesRequest = axios.get(URL);

        moviesRequest
        .then((answer) => {
            setMovies(answer.data);
            setIsLoading(false);
        })
        .catch((error) => console.log(error.response.data));

    }, []);

    return (
        <PageContainer>
            Selecione o filme
            <ListContainer>

            {isLoading ? (
                <LoadingContainer>
                    <ReactLoading type="spinningBubbles" color="#C3CFD9" height={100} width={100}/>
                </LoadingContainer>
            ) : (
            <>                
                {movies.map(movie => (                           
                    <Link key={movie.id} to={`/sessoes/${movie.id}`} >                               
                        <MovieContainer key={movie.title}>
                            <div data-test="movie">
                                <img src={movie.posterURL} alt={movie.title}/>        
                            </div>    
                        </MovieContainer>                           
                    </Link>
                ))}
            </>        
            )}
            </ListContainer>
        </PageContainer>
    );
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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`

const LoadingContainer = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;