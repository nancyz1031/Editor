import * as React from 'react';

interface Props {
    x: number;
    y: number;
    name: string;
}

export class PacMan extends React.Component<Props, {}> {
    public render() {
        const props = this.props;
        const x = props.x;
        const y = props.y;

        return <div className="pacMan" style={{ left: x, top: y }}>
            {this.props.name}
        </div>;
    }
}
