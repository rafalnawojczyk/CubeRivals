import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
const StarIcon = ({ color }: { color: string }) => (
    <Svg width={29} height={29} fill="none">
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12.398 7.684c.672-1.618 2.919-1.618 3.59 0l.469 1.128c.275.663.88 1.122 1.58 1.202l1.306.148c1.65.187 2.331 2.259 1.127 3.424l-1.11 1.074a2.018 2.018 0 0 0-.57 1.839l.268 1.356c.339 1.715-1.5 3.011-2.95 2.079l-.876-.563a1.916 1.916 0 0 0-2.077 0l-.876.563c-1.451.932-3.29-.364-2.95-2.08l.267-1.355a2.018 2.018 0 0 0-.57-1.84l-1.11-1.073c-1.204-1.165-.523-3.237 1.127-3.424l1.306-.148c.701-.08 1.306-.54 1.58-1.202l.469-1.128Z"
        />
        <Circle cx={14.193} cy={14.193} r={13.693} stroke={color} />
    </Svg>
);
export default StarIcon;
