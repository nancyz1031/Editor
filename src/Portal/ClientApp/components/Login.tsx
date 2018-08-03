import * as React from 'react';

export interface StateProps {
}

export interface DispatchProps {
    login: (name: string) => void
}

interface State {
    userName: string;
}

export class Login extends React.Component<StateProps & DispatchProps, State> {
    constructor(props) {
        super(props)
        this.state = { userName: null };
        this._handleChange = this._handleChange.bind(this);
        this._login = this._login.bind(this);
    }

    private _handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            userName: event.target.value
        });
    }

    private _login() {
        if (this.state.userName) {
            this.props.login(this.state.userName);
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.login("test");            
        }, 200);
    }

    public render() {
        return <div className="login-panel">
            <input
                className="user-name"
                value={this.state.userName}
                onChange={this._handleChange}
                placeholder="Please input your name" />
            <div>
                {this.state.userName && <button className={"active btn"}
                    onClick={this._login}>Start Game</button>}
            </div>
        </div>;
    }
}
