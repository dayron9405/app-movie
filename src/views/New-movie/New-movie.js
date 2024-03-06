import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { URL_BASE, API_KEY } from '../../utils/Constants.js';
import MovieCatalog from '../../components/Movie-catalog';

// components
import Footer from '../../components/Footer';
import Loading from '../../components/Loading-movie';
import Pagination from '../../components/Pagination';

import './New-movie.scss';

export default function NewMovies() {
    const [ movieList, setMovieList ] = useState([]);
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        (async () => {
            const moviePage = await fetch(`${URL_BASE}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}`);
            const movies = await moviePage.json();
            setMovieList(movies);
        })();
    }, [page])

    const onChangePage = (page) => {
        setPage(page)
    }

    return (
        <Row>
            <Col span="24" style={{ textAlign: "center", marginTop: 25 }}>
                <h1 style={{ fontSize: 30, fontWeight: "bold" }}>
                    Ultimos lanzamientos
                </h1>
            </Col>
            {movieList.results ? (
                <>
                <Col span="24">
                    <Row>
                        <MovieCatalog movies={movieList} />
                    </Row>
                </Col>
                <Col span="24">
                    <Pagination 
                        currentPage={movieList.page}
                        totalItems={movieList.total_results}
                        onChangePage={onChangePage}
                    />
                </Col>
                </>
            ) : (
                <Col span="24">
                    <Loading />
                </Col>
            )
            }
            <Col span="24">
                <Footer />
            </Col>
        </Row>
    )
}