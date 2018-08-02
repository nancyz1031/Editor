import * as React from 'react';
import { PacMan } from './PacMan';
import { variables } from '../variables';
import * as contract from '../contract';

export interface StateProps {
    players: contract.Player[];
}

export interface DispatchProps {
}

export class OtherPlayers extends React.Component<StateProps & DispatchProps, {}> {
    public render() {
        const props = this.props;
        return <div>
            {props.players.map(player => <PacMan key={player.id} player={player} current={false} />)}
        </div>;
    }
}
