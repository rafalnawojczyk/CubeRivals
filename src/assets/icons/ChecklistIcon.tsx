import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const ChecklistIcon = ({ color }: { color: string }) => (
    <Svg width={30} height={30} fill="none">
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m9.148 11.75 1.3 1.3 2.601-2.601m3.251 1.95h4.552M9.148 18.251l1.3 1.3 2.601-2.6M16.3 18.9h4.552m-16.66-.089a16.692 16.692 0 0 1 0-7.624 9.39 9.39 0 0 1 6.996-6.997 16.692 16.692 0 0 1 7.624 0 9.39 9.39 0 0 1 6.997 6.997 16.693 16.693 0 0 1 0 7.624 9.39 9.39 0 0 1-6.997 6.997 16.693 16.693 0 0 1-7.624 0 9.39 9.39 0 0 1-6.997-6.997Z"
        />
    </Svg>
);
export default ChecklistIcon;
