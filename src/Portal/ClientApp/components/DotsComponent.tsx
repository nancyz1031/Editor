import * as React from 'react';
import { variables } from '../variables';
import * as contract from '../contract';

export interface StateProps {
    dots: contract.Dots;
}

export interface DispatchProps {
}

export class DotsComponent extends React.Component<StateProps & DispatchProps, {}> {
    public renderDot(dot: contract.Dot) {
        const position = dot.position;
        const left = position.x * variables.size;
        const top = position.y * variables.size;
        const size = variables.size / 2;
        const margin = variables.size / 4;
        return <div key={dot.id}
            className="dot"
            style={{
                left: left,
                top: top,
                width: size,
                height: size,
                marginLeft: margin,
                marginTop: margin,
            }}>
        </div>
    }

    public render() {
        const props = this.props;
        if (!props.dots) {
            return null;
        }

        const dots = props.dots;
        const elements = [];
        for (var id in dots) {
            elements.push(this.renderDot(dots[id]));
        }

        return <div>{elements}</div>;
    }
}
