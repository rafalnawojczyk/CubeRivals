// @ts-ignore
import Scrambo from 'scrambo';
import { CubeType } from '../models/cubes';

const lengthMap: Partial<Record<CubeType, number>> = {
    '222': 11,
    '333': 22,
    '444': 40,
    '555': 40,
    '666': 40,
};

export const generateScramble = (cubeType: CubeType) => {
    const cube = new Scrambo().type(cubeType);

    if (Object.keys(lengthMap).includes(cubeType)) {
        return cube.length(lengthMap[cubeType]).get(1);
    }

    return cube.get(1);
};
