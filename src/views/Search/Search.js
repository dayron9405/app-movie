import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { URL_BASE, API_KEY } from '../../utils/Constants.js';

//components
import MovieCatalog from '../../components/Movie-catalog';
import Footer from '../../components/Footer';

import './Search.scss';

function Search(props) {
    const { location, history } = props;
    const [ movieList, setMovieList ] = useState([]);
    const [ searchValue, setSearchValues ] = useState("");

    useEffect(() => {
        (async () => {
        const searchValue = queryString.parseUrl(location.search);
        const { s } = searchValue.query;
        const response = await fetch(`${URL_BASE}/search/movie?api_key=${API_KEY}&language=es-Es&query=${s}&page=1`);
        const movies = await response.json();
        setSearchValues(s);
        setMovieList(movies);
        })();
    }, [ location.search ])

    const onChangeSearch = (e) => {
        const urlParams = queryString.parse(location.search);
        urlParams.s = e.target.value;
        history.push(`?${queryString.stringify(urlParams)}`)
        setSearchValues(e.target.value)
    }

    return (
        <Row>
            <Col span={12} offset={6} className="search">
                <h1>Search movies</h1>
                <Input value={searchValue} onChange={onChangeSearch} />
            </Col>
            {movieList.results && (
                <Col span={24}>
                    <Row>
                        <MovieCatalog movies={movieList} />
                    </Row>
                </Col>
            )}
            <Col span={24}>
                <Footer />
            </Col>
        </Row>
    )
}

export default withRouter (Search)