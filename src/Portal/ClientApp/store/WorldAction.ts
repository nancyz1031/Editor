import { Action, Reducer } from 'redux';
import { ActionType, UpdateRanksAction, UpdatePeasAction, StartGameAction } from './actions';
import { World, Rank, Ranks, Peas, Player, Variables, Players } from '../contract';

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
    updatePlayers: (peas: Peas) => {
        return { type: ActionType.UpdatePeas, peas: peas };
    },
    startGame: (currentPlayer: Player, world: World) => {
        return { type: ActionType.StartGame, currentPlayer, world: world };
    },
};

export const reducer: Reducer<WorldStoreState> = (state: WorldStoreState = null, action: Action | UpdateRanksAction | UpdatePeasAction | StartGameAction) => {
    switch (action.type) {
        case ActionType.UpdateRanks:
            return Object.assign({}, state, {
                ranks: (action as UpdateRanksAction).ranks
            });

        case ActionType.UpdatePeas:
            return Object.assign({}, state, {
                peas: (action as UpdatePeasAction).peas
            });

        case ActionType.StartGame:
            return (action as StartGameAction).world;

        default:
            break;
    }

    return state;
};