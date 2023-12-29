import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChartIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={30} fill="none">
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M11.099 18.901V13.7m7.802 5.201V15M15 17.6V11.1M4.191 18.812a16.692 16.692 0 0 1 0-7.624 9.39 9.39 0 0 1 6.997-6.997 16.692 16.692 0 0 1 7.624 0 9.39 9.39 0 0 1 6.997 6.997 16.693 16.693 0 0 1 0 7.624 9.39 9.39 0 0 1-6.997 6.997 16.693 16.693 0 0 1-7.624 0 9.39 9.39 0 0 1-6.997-6.997Z"
        />
    </Svg>
);
export default ChartIcon;
