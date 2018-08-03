import { Action, Reducer } from 'redux';
import { ActionType, UpdateRanksAction, UpdateDotsAction, StartGameAction, OtherPlayerMoveToAction, UpdatePlayersAction, SystemMessageAction } from './actions';
import { World, Rank, Ranks, Dots, Player, Variables, Players, Position } from '../contract';

export type WorldStoreState = World;

export const actionCreators = {
    updateRanks: (ranks: Ranks) => {
        return { type: ActionType.UpdateRanks, ranks: ranks };
    },
    updateDots: (dots: Dots) => {
        return { type: ActionType.UpdateDots, dots: dots };
    },
    startGame: (playerId: string, world: World) => {
        return { type: ActionType.StartGame, playerId: playerId, world: world };
    },
    updatePlayers: (players: Players) => {
        return { type: ActionType.UpdatePlayers, players: players };
    },
    otherPlayerMoveTo: (id: string, position: Position) => {
        return { type: ActionType.OtherPlayerMoveTo, id: id, position: position };
    },
    systemMessage: (message: string) => {
        return { type: ActionType.SystemMessage, message: message };
    }
};

export const reducer: Reducer<WorldStoreState> = (state: WorldStoreState = null, action: Action | UpdateRanksAction | UpdateDotsAction | StartGameAction) => {
    switch (action.type) {
        case ActionType.UpdateRanks:
            return Object.assign({}, state, {
                ranks: (action as UpdateRanksAction).ranks
            });

        case ActionType.UpdatePlayers:
            return Object.assign({}, state, {
                players: (action as UpdatePlayersAction).players
            });

        case ActionType.UpdateDots:
            return Object.assign({}, state, {
                dots: (action as UpdateDotsAction).dots
            });

        case ActionType.StartGame:
            return (action as StartGameAction).world;

        case ActionType.SystemMessage:
            let messages = (state && state.messages) || [];
            messages = [
                (action as SystemMessageAction).message,
                ...messages
            ];
            messages = messages.slice(0, 20);

            return Object.assign({}, state, {
                messages: messages
            });

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