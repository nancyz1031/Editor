import * as React from 'react';
import { PacMan } from './PacMan';

interface Props {
    x: number;
    y: number;
}

export class Player extends React.Component<Props, {}> {
    public render() {
        const props = this.props;
        return <PacMan x={props.x} y={props.y} name={""}>
        </PacMan>;
    }
}
