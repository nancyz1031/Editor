import { Rank, Dots, Player, World, Players } from "../contract";

export const enum ActionType {
    PlayerMove,
    UpdateUsers,
    UpdateRanks,
    UpdateDots,
    UpdatePlayers,
    StartGame,
    OtherPlayerMoveTo,
    SystemMessage,
}

export enum Direction {
    None,
    Up,
    Down,
    Left,
    Right,
}

export interface PlayerMoveAction {
    type: ActionType.PlayerMove,
    direction: Direction
}

export interface UpdateRanksAction {
    type: ActionType.UpdateRanks,
    ranks: Rank[],
}

export interface UpdateDotsAction {
    type: ActionType.UpdateDots,
    dots: Dots,
}

export interface UpdatePlayersAction {
    type: ActionType.UpdatePlayers,
    players: Players,
}

export interface OtherPlayerMoveToAction {
    type: ActionType.OtherPlayerMoveTo,
    id: string,
    position: Position,
}

export interface StartGameAction {
    type: ActionType.StartGame,
    playerId: string,
    world: World,
}

export interface UpdatePlayersAction {
    type: ActionType.UpdatePlayers,
    players: Players,
}

export interface OtherPlayerMoveToAction {
    type: ActionType.OtherPlayerMoveTo,
    id: string,
    position: Position,
}

export interface SystemMessageAction {
    type: ActionType.SystemMessage,
    message: string,
}