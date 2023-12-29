import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const EditIcon = ({ color }: { color: string }) => (
    <Svg width={17} height={17} fill="none">
        <Path
            stroke={color}
            d="M11.588 7.384c-1.425.475-3.325-1.425-2.85-2.85m.585-.585-3.07 3.07a10.413 10.413 0 0 0-2.738 4.837l-.149.593a.252.252 0 0 0 .307.306l.593-.148a10.412 10.412 0 0 0 4.837-2.739l3.07-3.07a2.015 2.015 0 0 0-2.85-2.85Z"
        />
    </Svg>
);
export default EditIcon;
