import * as React from 'react';
import { variables } from '../variables';
import * as contract from '../contract';

export interface StateProps {
    peas: contract.Peas;
}

export interface DispatchProps {
}

export class PeasComponent extends React.Component<StateProps & DispatchProps, {}> {
    public renderPea(pea: contract.Pea) {
        const position = pea.position;
        const left = position.x * variables.size;
        const top = position.y * variables.size;
        const size = variables.size / 2;
        const margin = variables.size / 4;
        return <div key={pea.id}
            className="pea"
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
        if (!props.peas) {
            return null;
        }

        const peas = props.peas;
        const elements = [];
        for (var id in peas) {
            elements.push(this.renderPea(peas[id]));
        }

        return <div>{elements}</div>;
    }
}
