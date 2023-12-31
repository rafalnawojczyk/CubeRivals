import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const CubeIcon = ({ color }: { color: string }) => (
    <Svg width={20} height={20} fill="none">
        <Path
            fill={color}
            d="M2.554 5.444a.625.625 0 0 1 .807-.363L10 7.866l6.693-2.812a.625.625 0 0 1 .444 1.169l-6.513 2.743v7.909a.625.625 0 1 1-1.25 0V8.966L2.917 6.25a.625.625 0 0 1-.363-.806Z"
        />
        <Path
            fill={color}
            d="M8.826 2.093a3.125 3.125 0 0 1 2.348 0l6.25 2.534c.55.223.91.757.91 1.351v8.044c0 .594-.36 1.129-.91 1.352l-6.25 2.533a3.126 3.126 0 0 1-2.348 0l-6.249-2.533a1.458 1.458 0 0 1-.91-1.352V5.978c0-.594.36-1.128.91-1.351l6.25-2.534Zm1.879 1.159a1.875 1.875 0 0 0-1.41 0L3.048 5.785a.208.208 0 0 0-.13.193v8.044c0 .085.051.161.13.193l6.249 2.534c.452.183.957.183 1.409 0l6.249-2.534a.208.208 0 0 0 .13-.193V5.978a.208.208 0 0 0-.13-.193l-6.25-2.533Z"
        />
    </Svg>
);
export default CubeIcon;
