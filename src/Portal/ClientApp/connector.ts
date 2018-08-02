import * as signalR from '@aspnet/signalr';
import { Rank, Player, World, Pea } from './contract';
import { store } from './boot-client';
import { actionCreators } from './store/WorldAction';

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

export function intialize(userName: string, color: string) {
    connection.invoke("UserJoin", userName, color)
        .catch(err => console.error(err.toString()));

}