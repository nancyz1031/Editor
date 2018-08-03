import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { Messages, StateProps, DispatchProps } from './Messages';

function mapStateToProps(state: ApplicationState): StateProps {
    return {
        messages: state.world.messages
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
    };
}

export const MessagesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages);
