import * as React from 'react';
import * as contract from '../contract';

export interface StateProps {
    ranks: contract.Ranks;
    id: string;
}

export interface DispatchProps {
}

export class RanksComponent extends React.Component<StateProps & DispatchProps, {}> {
    public render() {
        const props = this.props;
        if (!props.ranks) {
            return null;
        }

        const id = props.id;
        const rankElements = props.ranks
            .map((rank, index) => {
                const isCurrent = rank.id === id;
                return <tr key={rank.id} style={{ color: rank.color }}>
                    <td>{(index + 1).toString() + (isCurrent ? " (you)" : "")}</td>
                    <td>{rank.score}</td>
                    <td>{rank.userName}</td>
                </tr>
            });
        return <table id="ranks">
            <thead>
                <th>RANK</th>
                <th>SCORE</th>
                <th>NAME</th>
            </thead>
            <tbody>
                {rankElements}
            </tbody>
        </table>;
    }
}
