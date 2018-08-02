export interface Position {
    x: number;
    y: number;
}

export interface Player {
    id: string;
    name: string;
    color: string;
    score: number;
    position: Position;
}

export interface Variables {
    maxDot: number;
    step: number;
    worldWidth: number;
    worldHeight: number;
}

export interface Rank {
    id: string;
    score: number;
    userName: string;
    color: string;
}

export interface Variables {
    maxDot: number;
    step: number;
    worldWidth: number;
    worldHeight: number;
}

export interface Dot {
    id: string;
    position: Position;
}

export type Dots = { [key: string]: Dot };

export type Players = { [key: string]: Player };

export type Ranks = Rank[];

export interface World {
    variables: Variables;
    dots: Dots;
    players: Players;
    ranks: Ranks;
}
