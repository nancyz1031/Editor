import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { Login, StateProps, DispatchProps } from './Login';
import { utility } from '../utility';

function mapStateToProps(state: ApplicationState): StateProps {
    return {
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
        login: (userName: string) => {
            utility.join(userName);
        }
    };
}

export const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
