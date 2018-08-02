import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../store';
import * as PlayerAction from '../store/playerAction';
import { Player, StateProps, DispatchProps } from './Player';
import { Direction } from '../store/playerAction';

function mapStateToProps(state: ApplicationState): StateProps {
    return { x: state.player.x, y: state.player.y };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
        move: (up: boolean, right: boolean, down: boolean, left: boolean): void => {
            if (up) {
                dispatch(PlayerAction.actionCreators.move(Direction.Up));
            }

            if (right) {
                dispatch(PlayerAction.actionCreators.move(Direction.Right));
            }

            if (down) {
                dispatch(PlayerAction.actionCreators.move(Direction.Down));
            }

            if (left) {
                dispatch(PlayerAction.actionCreators.move(Direction.Left));
            }
        }
    };
}

export const PlayerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);
