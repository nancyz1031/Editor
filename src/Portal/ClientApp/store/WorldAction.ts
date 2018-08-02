import { Action, Reducer } from 'redux';
import { ActionType, UpdateRanksAction, UpdatePeasAction, StartGameAction, OtherPlayerMoveToAction, UpdatePlayersAction } from './actions';
import { World, Rank, Ranks, Peas, Player, Variables, Players, Position } from '../contract';

export interface WorldStoreState {
    variables: Variables;
    peas: Peas;
    players: Players;
    ranks: Ranks;
}

export const actionCreators = {
    updateRanks: (ranks: Ranks) => {
        return { type: ActionType.UpdateRanks, ranks: ranks };
    },
    updatePeas: (peas: Peas) => {
        return { type: ActionType.UpdatePeas, peas: peas };
    },
    startGame: (playerId: string, world: World) => {
        return { type: ActionType.StartGame, playerId:playerId, world: world };
    },
    updatePlayers: (players: Players) => {
        return { type: ActionType.UpdatePlayers, players: players };
    },
    otherPlayerMoveTo: (id: string, position: Position) => {
        return { type: ActionType.OtherPlayerMoveTo, id: id, position: position };
    },
};

export const reducer: Reducer<WorldStoreState> = (state: WorldStoreState = null, action: Action | UpdateRanksAction | UpdatePeasAction | StartGameAction) => {
    switch (action.type) {
        case ActionType.UpdateRanks:
            return Object.assign({}, state, {
                ranks: (action as UpdateRanksAction).ranks
            });

        case ActionType.UpdatePlayers:
            return Object.assign({}, state, {
                players: (action as UpdatePlayersAction).players
            });

        case ActionType.UpdatePeas:
            return Object.assign({}, state, {
                peas: (action as UpdatePeasAction).peas
            });

        case ActionType.StartGame:
            return (action as StartGameAction).world;

        case ActionType.OtherPlayerMoveTo:
            const id = (action as OtherPlayerMoveToAction).id;
            const position = (action as OtherPlayerMoveToAction).position;
            const changes = {};
            changes[id] = Object.assign({}, state.players[id], { position: position });
            return Object.assign({}, state, {
                players: Object.assign({}, state, changes)
            });

        default:
            break;
    }

    return state;
};