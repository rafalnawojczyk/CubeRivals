import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const AddIcon = ({ color }: { color: string }) => (
    <Svg width={17} height={17} fill="none">
        <Path
            stroke={color}
            d="M2.252 6.012a5.046 5.046 0 0 1 3.76-3.76 8.97 8.97 0 0 1 4.097 0 5.046 5.046 0 0 1 3.76 3.76 8.972 8.972 0 0 1 0 4.097 5.046 5.046 0 0 1-3.76 3.76 8.97 8.97 0 0 1-4.097 0 5.046 5.046 0 0 1-3.76-3.76 8.97 8.97 0 0 1 0-4.097Z"
        />
        <Path stroke={color} strokeLinecap="round" d="M9.74 8.06H6.382M8.06 9.74V6.382" />
    </Svg>
);
export default AddIcon;
