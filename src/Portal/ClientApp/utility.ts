import { Position } from './contract';
import { variables } from './variables';

export const utility = {
    playerMoveTo: (position: Position) => {
        (window as any).connector.playerMoveTo(position);
    },
    join: (userName: string) => {
        (window as any).connector.playerJoin(userName);
    },
    getColor: (index: number) => {
        const colors = variables.colors
        return colors[index % colors.length];
    }
}