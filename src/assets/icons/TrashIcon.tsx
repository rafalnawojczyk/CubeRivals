import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
const TrashIcon = ({ color }: { color: string }) => (
    <Svg width={29} height={29} fill="none">
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M12 14.708v3.884m4-3.884v3.884m-8.702-3.975a5.728 5.728 0 0 1 1.328-2.837 30.54 30.54 0 0 0 10.748 0 5.729 5.729 0 0 1 1.328 2.837l.038.233a7.347 7.347 0 0 1-.191 3.193l-.118.411c-.656 2.293-2.612 4.016-5.026 4.427-.93.159-1.88.159-2.81 0-2.414-.411-4.37-2.134-5.026-4.427l-.118-.411a7.347 7.347 0 0 1-.19-3.192l.037-.234Zm12.213-2.862a30.54 30.54 0 0 1-11.022 0C7.625 11.596 7 10.864 7 10.011v-.147c0-1.078.9-1.952 2.01-1.952h9.98c1.11 0 2.01.874 2.01 1.952v.147c0 .853-.625 1.585-1.489 1.744Zm-8.283-4.957c-.15.353-.228.732-.228 1.114h6c0-.382-.078-.76-.228-1.114a2.907 2.907 0 0 0-.65-.945 3.008 3.008 0 0 0-.974-.631 3.079 3.079 0 0 0-2.296 0c-.364.146-.695.36-.973.631-.279.27-.5.592-.65.945Z"
        />
        <Circle cx={14.193} cy={14.193} r={13.693} stroke={color} />
    </Svg>
);
export default TrashIcon;