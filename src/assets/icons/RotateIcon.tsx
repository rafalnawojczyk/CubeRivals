import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const RotateIcon = ({ color }: { color: string }) => (
    <Svg width={14} height={14} fill="none">
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.25 7.089c0 2.85-2.35 5.161-5.25 5.161S1.75 9.94 1.75 7.089c0-2.85 2.333-5.161 5.25-5.161 3.5 0 5.25 2.867 5.25 2.867m0 0V1.75m0 3.045H9.535"
        />
    </Svg>
);
export default RotateIcon;
