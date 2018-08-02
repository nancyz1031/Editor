import * as React from 'react';
import { variables } from '../variables';
import { Player } from '../contract';

interface Props {
    current: boolean;
    player: Player;
}

export class PacMan extends React.Component<Props, {}> {
    public render() {
        const props = this.props;
        const player = props.player;
        if (!player || !player.id) {
            return null;
        }

        const position = player.position;
        const left = position.x * variables.size;
        const top = position.y * variables.size;
        let classNames = "pacMan";
        if (props.current) {
            classNames += " current";
        }

        return <div className={classNames} style={{ left: left, top: top, width: variables.size, height: variables.size }}>
            <span style={{ color: player.color }}>{position.x + " " + position.y}</span>
        </div>;
    }
}
