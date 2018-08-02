import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { DotsComponent, StateProps, DispatchProps } from './DotsComponent';

function mapStateToProps(state: ApplicationState): StateProps {
    return {
        dots: state.world.dots
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
    };
}

export const DotsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DotsComponent);
