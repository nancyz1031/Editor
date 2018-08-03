import * as React from 'react';
import * as contract from '../contract';
import { utility } from '../utility';

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
                const color = utility.getColor(rank.colorIndex)
                const isCurrent = rank.id === id;
                return <tr key={rank.id} style={{ color: color }}>
                     <td>{rank.userName}</td>
                    <td>{(index + 1).toString() + (isCurrent ? " (you)" : "")}</td>
                    <td>{rank.score}</td>
                </tr>
            });
        return <table id="ranks">
            <thead>
                <th>NAME</th>
                <th>RANK</th>
                <th>SCORE</th>
            </thead>
            <tbody>
                {rankElements}
            </tbody>
        </table>;
    }
}
