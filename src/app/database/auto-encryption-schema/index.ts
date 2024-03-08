import {NAMESPACE_ENVIRONMENTS} from '../../config';
import environmentAutoSchema from './environment.auto-schema';

const autoEncrptionSchema: Record<string, unknown> = {};

autoEncrptionSchema[NAMESPACE_ENVIRONMENTS] = environmentAutoSchema;

export default autoEncrptionSchema;
