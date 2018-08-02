import { Action, Reducer } from 'redux';
import { variables } from '../variables'
import { ActionType, StartGameAction, PlayerMoveAction, Direction } from './actions';
import { Player, Position } from '../contract';

export type PlayerStoreState = Player;

export const actionCreators = {
    playerMove: (direction: Direction) => {
        return { type: ActionType.PlayerMove, direction: direction };
    },
}

const maxX = 40 - 1;
const maxY = 30 - 1;

function getNewPosition(position: Position, direction: Direction) {
    let x = position.x;
    let y = position.y;
    switch (direction) {
        case Direction.Left:
            x = x - 1;
            break;
        case Direction.Right:
            x = x + 1;
            break;
        case Direction.Up:
            y = y - 1;
            break;
        case Direction.Down:
            y = y + 1;
            break;
        default:
            return position;
    }

    if (x < 0) {
        x = 0;
    } else if (x > maxX) {
        x = maxX
    }

    if (y < 0) {
        y = 0;
    } else if (y > maxY) {
        y = maxY
    }

    return { x: x, y: y }
}

const emptyPlayer: PlayerStoreState = {
    id: "",
    name: "",
    color: "",
    score: 0,
    position: { x: 0, y: 0 },
};

export const reducer: Reducer<PlayerStoreState> = (state: PlayerStoreState = emptyPlayer, action: Action | StartGameAction | PlayerMoveAction): PlayerStoreState => {
    switch (action.type) {
        case ActionType.StartGame:
            return (action as StartGameAction).currentPlayer;

        case ActionType.PlayerMove:
            const position = getNewPosition(state.position, (action as PlayerMoveAction).direction);
            if (position !== state.position) {
                return Object.assign({}, state, {
                    position: position
                });

            }
            break;
    }

    return state;
}