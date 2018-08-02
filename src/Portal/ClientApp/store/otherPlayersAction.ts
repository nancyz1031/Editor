import { Action, Reducer } from 'redux';
import { ActionType, UpdateRanksAction, UpdatePeasAction, StartGameAction } from './actions';
import { World, Rank, Peas, Player, Variables, Players } from '../contract';

export type PlayersStoreState = Players

export interface UpdatePlayersAction {
    type: ActionType.UpdatePlayers,
    players: Players,
}

export interface OtherPlayerMoveToAction {
    type: ActionType.OtherPlayerMoveTo,
    id: string,
    position: Position,
}

export const actionCreators = {
    updatePlayers: (players: Players) => {
        return { type: ActionType.UpdatePlayers, players: players };
    },
    otherPlayerMoveTo: (id: string, position: Position) => {
        return { type: ActionType.OtherPlayerMoveTo, id: id, position: position };
    },
};

export const reducer: Reducer<PlayersStoreState> = (state: PlayersStoreState = null, action: Action | UpdatePlayersAction | OtherPlayerMoveToAction) => {
    switch (action.type) {
        case ActionType.UpdatePlayers:
            return (action as UpdatePlayersAction).players;

        case ActionType.OtherPlayerMoveTo:
            const id = (action as OtherPlayerMoveToAction).id;
            const position = (action as OtherPlayerMoveToAction).position;
            const changes = {};
            changes[id] = Object.assign({}, state[id], {position:position});
            return Object.assign({}, state, changes);

        default:
            break;
    }

    return state;
};