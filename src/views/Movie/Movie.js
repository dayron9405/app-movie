import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useFetch from '../../hooks/useFetch.js';
import { URL_BASE, API_KEY } from '../../utils/Constants.js';
import Loading from '../../components/Loading-movie';
import { PlayCircleOutlined } from '@ant-design/icons';

//components
import ModalVideo from '../../components/Modal-video';

import './Movie.scss';

export default function Movie() {
    const { id } = useParams();

    const movie = useFetch(`${URL_BASE}/movie/${id}?api_key=${API_KEY}&language=es-ES&page=1`);

    if (movie.Loading || !movie.result) {
        return <Loading />
    }else {
        return (
            <RenderMovie movie={movie.result} />
        )
    }
    
}

function RenderMovie(props){
    const { movie: { backdrop_path, poster_path } } = props;

    const backdropPath = `https://image.tmdb.org/t/p/original/${backdrop_path}`; 

    return(
        <div 
            className="movie" 
            style={{ backgroundImage: `url('${backdropPath}')` }}
        >
            <div className="movie__dark" />
            <Row>
                <Col 
                    className="movie__poster" 
                    span={8} 
                    offset={3}
                >
                    <PosterMovie image={ poster_path } />
                </Col>
                <Col 
                    className="movie__info"     
                    span={10} 
                >
                    <MovieInfo movieInfo={ props.movie } />
                </Col>
            </Row>
        </div>
    )
}


function PosterMovie(props) {
    const { image } = props;
    const posterPath = `https://image.tmdb.org/t/p/original/${image}`;

    return(
        <div style={{ backgroundImage: `url('${ posterPath }')` }} />
    )
}

function MovieInfo(props){
    const { 
        movieInfo:{
            id, title, overview, release_date, genres
        }
    } = props;
    const [ isVisibleModal, setIsVisibleModal ] = useState(false)
    const videoMovie = useFetch(`${URL_BASE}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`)

    const openModal = () => {
        return setIsVisibleModal(true)
    }

    const closeModal = () => {
        return setIsVisibleModal(false)
    }

    const renderVideo = () =>{
        if (videoMovie.result) {
            if (videoMovie.result.results.length > 0) {
                return (
                    <>
                        <Button
                            icon={<PlayCircleOutlined />}
                            onClick={openModal}
                        >
                            Ver Trailer...
                        </Button>
                        <ModalVideo 
                            videoKey={videoMovie.result.results[0].key}
                            videoPlatForm={videoMovie.result.results[0].site}
                            isOpen={isVisibleModal}
                            close={closeModal}
                        />
                        {/* <button>
                            Ver Trailer...
                        </button>
                        <ModalVideo  /> */}
                    </>
                )
            }
        }
    }

    return(
        <>
            <div className="movie__info-header">
                <h1>
                    { title }:
                    <span>{ moment(release_date, "YYYY-MM-DD").format('YYYY') }</span>
                </h1>
                {renderVideo()}
            </div>
            <div className="movie__info-content">
                <h3>Resumen</h3>
                <p>{ overview }</p>

                <h3>Generos</h3>
                <ul>
                    {genres.map(gender =>(
                        <li key={gender.id}>{ gender.name }</li>
                    ))}
                </ul>
            </div>
        </>
    )
}
