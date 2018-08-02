import * as signalR from '@aspnet/signalr';
import { Rank, Player, World, Pea, Position, Players } from './contract';
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

connection.on("StartGame", (playerId: string, world: World) => {
    store.dispatch(actionCreators.startGame(playerId, world));
});

connection.on("PlayerMoveTo", (playerId: string, position: Position) => {
    store.dispatch(actionCreators.otherPlayerMoveTo(playerId, position));
});

connection.on("UpdatePlayers", (players: Players) => {
    store.dispatch(actionCreators.updatePlayers(players));
});

connection.start().catch(err => console.error(err.toString()));

export function intialize(userName: string, color: string) {
    connection.invoke("UserJoin", userName, color)
        .catch(err => console.error(err.toString()));
}

(window as any).connector = {
    playerMoveTo: (position: Position) => {
        connection.invoke("PlayerMoveTo", position)
            .catch(err => console.error(err.toString()));
    }
}