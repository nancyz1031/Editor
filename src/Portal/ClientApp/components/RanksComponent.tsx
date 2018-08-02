import * as React from 'react';
import * as contract from '../contract';

export interface StateProps {
    ranks: contract.Ranks;
}

export interface DispatchProps {
}

export class RanksComponent extends React.Component<StateProps & DispatchProps, {}> {
    public render() {
        const props = this.props;
        if (!props.ranks) {
            return null;
        }

        const rankElements = props.ranks
            .map(rank => <li key={rank.id} style={{ color: rank.color }}>{rank.userName} {rank.score}</li>);
        return <ul id="ranks">{rankElements}</ul>;
    }
}
