import * as React from 'react';
import Svg, { Path, Mask, Circle } from 'react-native-svg';
const WarningIcon = ({ color }: { color: string }) => (
    <Svg width={29} height={29} fill="none">
        <Path
            stroke={color}
            strokeWidth={1.5}
            d="M7.575 11.859a5.748 5.748 0 0 1 4.283-4.284 10.22 10.22 0 0 1 4.668 0 5.749 5.749 0 0 1 4.284 4.284c.36 1.535.36 3.133 0 4.668a5.749 5.749 0 0 1-4.284 4.283c-1.535.36-3.133.36-4.668 0a5.749 5.749 0 0 1-4.283-4.283 10.22 10.22 0 0 1 0-4.668Z"
        />
        <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.192 16.871v-3.06" />
        <Mask id="a" fill="#fff">
            <Circle cx={14.192} cy={11.897} r={0.765} />
        </Mask>
        <Path
            fill={color}
            d="M13.958 11.897c0-.13.105-.235.234-.235v2c.975 0 1.766-.79 1.766-1.765h-2Zm.234-.235c.13 0 .235.105.235.235h-2c0 .975.79 1.765 1.765 1.765v-2Zm.235.235c0 .13-.105.235-.235.235v-2c-.975 0-1.765.79-1.765 1.765h2Zm-.235.235a.235.235 0 0 1-.234-.235h2c0-.975-.79-1.765-1.766-1.765v2Z"
            mask="url(#a)"
        />
        <Circle cx={14.193} cy={14.193} r={13.693} stroke={color} />
    </Svg>
);
export default WarningIcon;
