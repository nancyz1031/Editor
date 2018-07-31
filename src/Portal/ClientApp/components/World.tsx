import * as React from 'react';
import { PlayerContainer } from './PlayerContainer';

export class World extends React.Component<{}, {}> {
    public render() {
        return <div id="world">
            <PlayerContainer />
        </div>;
    }
}
