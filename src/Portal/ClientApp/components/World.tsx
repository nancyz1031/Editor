import * as React from 'react';
import { PlayerContainer } from './PlayerContainer';
import { variables } from '../variables';
import * as contract from '../contract';
import { PeasContainer } from './PeasContainer';
import { RanksContainer } from './RanksContainer';
import { OtherPlayersContainer } from './OtherPlayersContainer';

export type StateProps = contract.World;

export interface DispatchProps {

}

export class World extends React.Component<StateProps & DispatchProps, {}> {
    public render() {
        const world = this.props;
        if (!world || !world.variables) {
            return null;
        }

        const width = world.variables.worldWidth * variables.size;
        const height = world.variables.worldHeight * variables.size;
        return <div>
            <div>
                <div id="world" style={{ width: width, height: height }}>
                    <PeasContainer />
                    <OtherPlayersContainer />
                    <PlayerContainer />
                </div>
                <RanksContainer />
            </div>
        </div>;
    }
}
