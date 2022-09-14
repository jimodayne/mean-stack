import { HEX } from '../constants/index';

export const isValidId = (id: string) => HEX.test(id);
