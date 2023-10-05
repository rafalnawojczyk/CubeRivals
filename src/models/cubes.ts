import { ImageSourcePropType } from 'react-native';

export const CubeTypesArr = ['333', '222', '444', '555', '666', 'clock', 'pyram', 'sq1', 'skewb', 'minx'] as const;

export type CubeType = (typeof CubeTypesArr)[number];

export interface CubeDataInterface {
    id: CubeType;
    fullName: string;
    icon: ImageSourcePropType;
}
