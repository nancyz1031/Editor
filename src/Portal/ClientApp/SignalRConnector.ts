import * as signalR from '@aspnet/signalr';
import { Rank, Player, World, Dot, Position, Players } from './contract';
import { store } from './boot-client';
import { actionCreators } from './store/WorldAction';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/worldHub")
    .build();

connection.on("UpdateRanks", (ranks: Rank[]) => {
    store.dispatch(actionCreators.updateRanks(ranks));
});

connection.on("UpdateDots", (dots: { [key: string]: Dot }) => {
    store.dispatch(actionCreators.updateDots(dots));
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

connection.on("SystemMessage", (message: string) => {
    console.info(message);
    store.dispatch(actionCreators.systemMessage(message));
});

connection.start()
    .then(() => {
        console.log("Connected!!");
    })
    .catch(err => console.error(err.toString()));

export function intialize() {
}

(window as any).connector = {
    playerMoveTo: (position: Position) => {
        connection.invoke("PlayerMoveTo", position)
            .catch(err => console.error(err.toString()));
    },
    playerJoin: (userName: string) => {
        connection.invoke("PlayerJoin", userName)
            .catch(err => console.error(err.toString()));
    }
}