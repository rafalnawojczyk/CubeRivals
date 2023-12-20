import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const ClockIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={30} fill="none">
        <Path
            stroke={color}
            strokeWidth={1.5}
            d="M4.191 11.188a9.39 9.39 0 0 1 6.997-6.997 16.692 16.692 0 0 1 7.624 0 9.39 9.39 0 0 1 6.997 6.997 16.693 16.693 0 0 1 0 7.624 9.39 9.39 0 0 1-6.997 6.997 16.693 16.693 0 0 1-7.624 0 9.39 9.39 0 0 1-6.997-6.997 16.692 16.692 0 0 1 0-7.624Z"
        />
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m18.125 18.125-3.548-2.258V11.25"
        />
    </Svg>
);
export default ClockIcon;
