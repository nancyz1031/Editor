import * as React from 'react';
import { PlayerContainer } from './PlayerContainer';
import { variables } from '../variables';

export class World extends React.Component<{}, {}> {
    public render() {
        return <div id="world" style={{ width: variables.worldWidth, height: variables.worldHeight }}>
            <PlayerContainer />
        </div>;
    }
}
