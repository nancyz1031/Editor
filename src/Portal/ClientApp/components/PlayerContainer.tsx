import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../store';
import * as PlayerAction from '../store/playerAction';
import { Player, StateProps, DispatchProps } from './Player';
import { Direction } from '../store/actions';

function mapStateToProps(state: ApplicationState): StateProps {
    return {
        player: state.player
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
        move: (up: boolean, right: boolean, down: boolean, left: boolean): void => {
            if (up) {
                dispatch(PlayerAction.actionCreators.playerMove(Direction.Up));
            }

            if (right) {
                dispatch(PlayerAction.actionCreators.playerMove(Direction.Right));
            }

            if (down) {
                dispatch(PlayerAction.actionCreators.playerMove(Direction.Down));
            }

            if (left) {
                dispatch(PlayerAction.actionCreators.playerMove(Direction.Left));
            }
        }
    };
}

export const PlayerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);
