import * as React from 'react';
import { PacMan } from './PacMan';
import { variables } from '../variables';

export interface StateProps {
    x: number;
    y: number;
}

export interface DispatchProps {
    move(up: boolean, right: boolean, down: boolean, left: boolean): void
}

function init(dispatchProps: DispatchProps) {
    const dic: { [key: string]: boolean; } = {};

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
            case 'd':
            case 's':
            case 'a':
                dic[event.key] = true;
                break;
        }
    });

    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'w':
            case 'd':
            case 's':
            case 'a':
                dic[event.key] = false;
                break;
        }
    });

    window.setInterval(() => {
        dispatchProps.move(dic['w'], dic['d'], dic['s'], dic['a']);
    }, variables.refreshFrequency);
}

export class Player extends React.Component<StateProps & DispatchProps, {}> {
    componentDidMount() {
        init(this.props);
    }

    public render() {
        const props = this.props;
        return <PacMan x={props.x} y={props.y} name={""}>
        </PacMan>;
    }
}
