import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.scss';

// Components
import MenuTop from './components/Menu-top';

// Views
import Home from './views/Home';
import Error404 from './views/Error404';
import Movie from './views/Movie';
import NewMovie from './views/New-movie';
import Popular from './views/Popular';
import Search from './views/Search'

export default function App() {
  const { Header, Content } = Layout

  return (
    <Layout>
      <Router>
        <Header style={{ zIndex: 1 }}>
          <MenuTop/>
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true}>
              <Home/>
            </Route>
            <Route path="/movie/:id" exact={true}>
              <Movie/>
            </Route>
            <Route path="/new-movies" exact={true}>
              <NewMovie/>
            </Route>
            <Route path="/popular" exact={true}>
              <Popular/>
            </Route>
            <Route path="/search" exact={true}>
              <Search/>
            </Route>
            <Route path="*">
              <Error404/>
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

