import { Action, Reducer } from 'redux';
import { variables } from '../variables'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface PlayerStoreState {
    x: number;
    y: number;
    id: string;
}

export enum Direction {
    None,
    Up,
    Down,
    Left,
    Right,
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface Move { type: 'Move', direction: Direction }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = Move;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    move: (direction: Direction) => <Move>{ type: 'Move', direction: direction },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const maxX = variables.worldWidth - variables.pacManWidth;
const maxY = variables.worldHeight - variables.pacManHeight;

export const reducer: Reducer<PlayerStoreState> = (state: PlayerStoreState = { x: 0, y: 0, id: "id" }, action: Action | Move) => {
    switch (action.type) {
        case 'Move':
            let x = state.x;
            let y = state.y;
            switch ((action as Move).direction) {
                case Direction.Left:
                    x = state.x - variables.step;
                    break;
                case Direction.Right:
                    x = state.x + variables.step;
                    break;
                case Direction.Up:
                    y = y - variables.step;
                    break;
                case Direction.Down:
                    y = y + variables.step;
                    break;
                default:
                    return state;
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

            return { id: state.id, x: x, y: y };
        default:
            break;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    return state;
};

//document.addEventListener('keydown', (event) => {
//    switch (event.key) {
//        case 'd':

//    }
//    const keyName = event.key;
//    alert('keydown event\n\n' + 'key: ' + keyName);
//});
