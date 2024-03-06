import React from 'react';
import { Row, Col } from 'antd';
import useFetch from '../../hooks/useFetch.js';
import { API_KEY, URL_BASE } from '../../utils/Constants.js'

// Components
import SliderMovies from '../../components/Slider-movies';
import MovieList from '../../components/Movie-list';
import Footer from '../../components/Footer';

export default function Home() {

    const movies = useFetch(`${URL_BASE}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`);
    const popularMovies = useFetch(`${URL_BASE}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`);
    const topMovies = useFetch(`${URL_BASE}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`);

    return (
        <div>
            <SliderMovies movies={movies}/>
            <Row>
                <Col span={12}>
                    <MovieList title="Movies Popular" movies={popularMovies} />
                </Col>
                <Col span={12}>
                    <MovieList title="Top Movies" movies={topMovies} />
                </Col>
            </Row>
            <Footer />
        </div>
    )
}