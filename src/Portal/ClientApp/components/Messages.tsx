import * as React from 'react';
import { variables } from '../variables';
import * as contract from '../contract';

export interface StateProps {
    messages: string[];
}

export interface DispatchProps {
}

export class Messages extends React.Component<StateProps & DispatchProps, {}> {
    public render() {
        const props = this.props;
        const messages = props.messages || [];
        return <ul className="messages">
            {messages.map((message, i) =>
                <li key={message + i}>
                    {message}
                </li>
            )}
            {messages.length > 0 && <li>...</li>}
        </ul>;
    }
}
