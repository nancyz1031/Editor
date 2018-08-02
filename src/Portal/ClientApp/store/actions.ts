import { Rank, Peas, Player, World, Players } from "../contract";

export const enum ActionType {
    PlayerMove,
    UpdateUsers,
    UpdateRanks,
    UpdatePeas,
    UpdatePlayers,
    StartGame,
    OtherPlayerMoveTo,
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

export interface UpdatePeasAction {
    type: ActionType.UpdatePeas,
    peas: Peas,
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
    currentPlayer: Player,
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