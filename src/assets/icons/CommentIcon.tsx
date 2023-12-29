import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const CommentIcon = ({ color }: { color: string }) => (
    <Svg width={29} height={29} fill="none">
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M11.665 11.941h4.616m-4.616 2.645h2.937m.441 4.908h.813c2.209 0 4.13-1.59 4.65-3.846a7.619 7.619 0 0 0 0-3.409l-.069-.296c-.5-2.174-2.129-3.863-4.205-4.36l-.292-.07a7.54 7.54 0 0 0-3.515 0l-.17.04c-2.15.515-3.838 2.265-4.356 4.517a8.425 8.425 0 0 0 .003 3.759c.526 2.287 2.072 4.19 4.147 5.078l.09.038c.898.384 1.926-.078 2.295-1.02a.662.662 0 0 1 .61-.431Z"
        />
        <Circle cx={14.193} cy={14.193} r={13.693} stroke={color} />
    </Svg>
);
export default CommentIcon;
