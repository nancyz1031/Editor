import * as React from 'react';
import { variables } from '../variables';
import { Player } from '../contract';
import { utility } from '../utility';

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
        const color = utility.getColor(player.index);
        let classNames = "pacMan";
        if (props.current) {
            classNames += " current";
        }

        return <div
            className={classNames}
            style={{
                left: left,
                top: top,
                width: variables.size,
                height: variables.size,
                backgroundColor: color
            }}>
            <div
                className='name'
                style={{ color: color }}>{player.name}</div>
        </div>;
    }
}
