import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as WeatherForecastsState from '../store/WeatherForecasts';
import { Player } from './Player';

export const PlayerContainer = connect(
    (state: ApplicationState) => state.player, // Selects which state properties are merged into the component's props
)(Player);
