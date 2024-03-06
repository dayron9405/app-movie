import React from 'react';
import { Spin } from 'antd';
import './Loading-movie.scss';

export default function LoadingMovie() {
    return (
        <div className="loading">
            <Spin size="large"/>
        </div>
    )
}