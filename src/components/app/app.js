import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import { PeoplePage, PlanetPage, LoginPage, SecretPage } from '../pages';
import { PlanetDetails } from '../sw-components';

export default class App extends Component {
    state = {
        showRandomPlanet: true,
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            const Service = swapiService instanceof SwapiService
                ? DummySwapiService
                : SwapiService;

            return {
                swapiService: new Service()
            };
        });
    }

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    }

    render() {
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService} >
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange} />
                            <RandomPlanet />
                            <Switch>
                                <Route path="/" exact render={() => <h2>Welcome to Star DB!</h2>} />
                                <Route path="/people/:id?" exact component={PeoplePage} />
                                <Route path="/planets/" exact component={PlanetPage} />

                                <Route
                                    path="/login"
                                    render={() => {
                                        return <LoginPage isLoggedIn={this.state.isLoggedIn} onLogin={this.onLogin} />;
                                    }}
                                />

                                <Route
                                    path="/secret"
                                    render={() => {
                                        return <SecretPage isLoggedIn={this.state.isLoggedIn} />;
                                    }}
                                />

                                <Route
                                    path="/planets/:id"
                                    exact
                                    render={
                                        ({ match }) => {
                                            const { id } = match.params;

                                            return <PlanetDetails itemId={id} />
                                        }
                                    }
                                />

                                <Route render={() => <h2>Page not found</h2>} />
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
