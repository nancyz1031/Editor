import { Position } from './contract';

export const utility = {
    playerMoveTo: (position: Position) => {
        (window as any).connector.playerMoveTo(position);
    }
}