import { Position } from './contract';

export const utility = {
    playerMoveTo: (position: Position) => {
        (window as any).connector.playerMoveTo(position);
    },
    join: (userName: string) => {
        (window as any).connector.playerJoin(userName);
    }

}