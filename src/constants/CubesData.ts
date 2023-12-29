import { CubeDataInterface } from '../models/cubes';
// TODO: icon is currently not used anymore, maybe delete it?
export const CUBES_DATA: CubeDataInterface[] = [
    { fullName: '2x2x2', icon: require('../../assets/icons/222.png'), id: '222' },
    { fullName: '3x3x3', icon: require('../../assets/icons/333.png'), id: '333' },
    { fullName: '4x4x4', icon: require('../../assets/icons/444.png'), id: '444' },
    { fullName: '5x5x5', icon: require('../../assets/icons/555.png'), id: '555' },
    { fullName: '6x6x6', icon: require('../../assets/icons/666.png'), id: '666' },
    { fullName: 'Skewb', icon: require('../../assets/icons/skewb.png'), id: 'skewb' },
    { fullName: 'Mega minx', icon: require('../../assets/icons/minx.png'), id: 'minx' },
    { fullName: 'Pyra minx', icon: require('../../assets/icons/pyram.png'), id: 'pyram' },
    { fullName: 'Square 1', icon: require('../../assets/icons/sq1.png'), id: 'sq1' },
    // { fullName: 'Clock', icon: require('../../assets/icons/clock.png'), id: 'clock' },
];
