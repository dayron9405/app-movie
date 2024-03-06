import React from 'react';
import { Carousel, Button } from 'antd';
import { Link } from 'react-router-dom';
import { URL_IMG } from '../../utils/Constants.js';
import './Slider-movies.scss';

// Components
import LoadingMovie from '../Loading-movie';

export default function SliderMovies(props){
    const { 
        movies: {
            loading,
            result
        } 
    } = props

    if (loading || !result) {
        return <LoadingMovie />
    }else {
        const { results } = result 
        return (
            <Carousel autoplay className="slider-movies">
                {results.map((movie) => (
                    <Movie key={movie.id} movie={movie}/>
                ))}
            </Carousel>
        )
    }
}

function Movie(props) {
    const { 
        movie: {
            id,
            backdrop_path, 
            title,
            overview
        }
    } = props

    const backdropPath = `${URL_IMG}/${backdrop_path}`;

    return (
        <div 
            className="slider-movies__movie"
            style={{ backgroundImage: `url('${backdropPath}')` }}
        >
            <div className="slider-movies__movie-info">
                <div>
                    <h2>{ title }</h2>
                    <p>{ overview }</p>
                    <Link to={`movie/${id}`}>
                        <Button type="primary">Ver más</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}