import * as signalR from '@aspnet/signalr';
import { Rank, Player, World, Pea, Position } from './contract';
import { store } from './boot-client';
import { actionCreators } from './store/WorldAction';
import { ApplicationState } from './store';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/worldHub")
    .build();

connection.on("SystemMessage", (message) => {
    console.info(message);
});

connection.on("UpdateRanks", (ranks: Rank[]) => {
    store.dispatch(actionCreators.updateRanks(ranks));
});

connection.on("UpdatePeas", (peas: { [key: string]: Pea }) => {
    store.dispatch(actionCreators.updatePeas(peas));
});

connection.on("StartGame", (currentPlayer: Player, world: World) => {
    store.dispatch(actionCreators.startGame(currentPlayer, world));
});

connection.start().catch(err => console.error(err.toString()));

let playerPosition: Position;

function getPlayerPosition(state: ApplicationState): Position {
    const player = state && state.player;
    return player.position;
}

export function intialize(userName: string, color: string) {
    connection.invoke("UserJoin", userName, color)
        .catch(err => console.error(err.toString()));

    // store.subscribe(() => {
    //     const newPosition = getPlayerPosition(store.getState())
    //     if (playerPosition && newPosition) {
    //         if (playerPosition.x != newPosition.x || playerPosition.y != newPosition.y) {
    //             playerMoveTo(newPosition);
    //         }
    //     } else {
    //         playerPosition = newPosition;
    //     }
    // })
}

(window as any).connector = {
    playerMoveTo: (position: Position) => {
        connection.invoke("PlayerMoveTo", position)
            .catch(err => console.error(err.toString()));
    }
}