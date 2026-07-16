import { rolldownConfig } from '../../rolldown.base.config';
import pkg from './package.json' with { type: 'json' };
export default rolldownConfig(pkg);
