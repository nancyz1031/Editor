import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { World, StateProps, DispatchProps } from './World';

function mapStateToProps(state: ApplicationState): StateProps {
    return state.world;
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
    };
}

export const WorldContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(World);
