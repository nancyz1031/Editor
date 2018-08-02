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
    maxPea: number;
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
    maxPea: number;
    step: number;
    worldWidth: number;
    worldHeight: number;
}

export interface Pea {
    id: string;
    position: Position;
}

export type Peas = { [key: string]: Pea };

export type Players = { [key: string]: Player };

export interface World {
    variables: Variables;
    peas: Peas;
    players: Players;
    ranks: Rank[];
}
