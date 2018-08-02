import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { PeasComponent, StateProps, DispatchProps } from './PeasComponent';

function mapStateToProps(state: ApplicationState): StateProps {
    return {
        peas: state.world.peas
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
    };
}

export const PeasContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PeasComponent);
