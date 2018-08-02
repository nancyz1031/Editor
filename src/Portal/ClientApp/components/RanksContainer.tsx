import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { RanksComponent, StateProps, DispatchProps } from './RanksComponent';

function mapStateToProps(state: ApplicationState): StateProps {
    return {
        ranks: state.world.ranks,
        id: state.player.id,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
    };
}

export const RanksContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RanksComponent);
