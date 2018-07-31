import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface PlayerState {
    x: number;
    y: number;
    id: string;
}

enum Direction {
    None,
    Top,
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

const speed = 1;
export const reducer: Reducer<PlayerState> = (state: PlayerState = {x:0,y:0,id:"id"}, action: Action | Move) => {
    switch (action.type) {
        case 'Move':
            let x = state.x;
            let y = state.y;
            switch ((action as Move).direction) {
                case Direction.Left:
                    x = state.x - speed;
                    break;
                case Direction.Right:
                    x = state.x + speed;
                    break;
                case Direction.Top:
                    y = y - speed;
                    break;
                case Direction.Down:
                    y = y + speed;
                    break;
                default:
                    return state;
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
