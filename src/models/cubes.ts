import { ImageSourcePropType } from 'react-native';

export type CubeType = '333' | '222' | '444' | '555' | '666' | 'clock' | 'pyram' | 'sq1' | 'skewb' | 'minx';

export interface CubeDataInterface {
    id: CubeType;
    fullName: string;
    icon: ImageSourcePropType;
}
