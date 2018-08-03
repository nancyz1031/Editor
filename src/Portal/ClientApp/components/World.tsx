import * as React from 'react';
import { PlayerContainer } from './PlayerContainer';
import { variables } from '../variables';
import * as contract from '../contract';
import { DotsContainer } from './DotsContainer';
import { RanksContainer } from './RanksContainer';
import { OtherPlayersContainer } from './OtherPlayersContainer';
import { LoginContainer } from './LoginContainer';
import { MessagesContainer } from './MessagesContainer';

export type StateProps = contract.World;

export interface DispatchProps {

}

export class World extends React.Component<StateProps & DispatchProps, {}> {
    public render() {
        const world = this.props;
        if (!world || !world.variables) {
            return <LoginContainer />;
        }

        const width = world.variables.worldWidth * variables.size;
        const height = world.variables.worldHeight * variables.size;
        return <div>
            <div id="world" style={{ width: width, height: height }}>
                <DotsContainer />
                <OtherPlayersContainer />
                <PlayerContainer />
                <MessagesContainer />
            </div>
            <RanksContainer />
        </div>;
    }
}
