import { rolldownConfig } from '../../rolldown.base.config';
import pkg from './package.json' assert { type: 'json' };
export default rolldownConfig(pkg);
