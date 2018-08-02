import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { OtherPlayers, StateProps, DispatchProps } from './OtherPlayers';

function mapStateToProps(state: ApplicationState): StateProps {
    const players = [];
    const currentPlayerId = state.player.id;
    const playserDic = state.world.players;
    for (var id in playserDic) {
        if (id != currentPlayerId) {
            players.push(playserDic[id]);
        }
    }

    return {
        players: players
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
    };
}

export const OtherPlayersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OtherPlayers);
