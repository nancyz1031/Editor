import * as PlayerAction from './playerAction';
import * as WorldAction from './WorldAction';

// The top-level state object
export interface ApplicationState {
    player: PlayerAction.PlayerStoreState;
    world: WorldAction.WorldStoreState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    player: PlayerAction.reducer,
    world: WorldAction.reducer,
};