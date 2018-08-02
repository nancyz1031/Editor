import { Rank, Peas, Player, World } from "../contract";

export const enum ActionType {
    PlayerMove,
    UpdateUsers,
    UpdateRanks,
    UpdatePeas,
    StartGame,
    MoveTo,
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

export interface StartGameAction {
    type: ActionType.StartGame,
    currentPlayer: Player,
    world: World,
}
