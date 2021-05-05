import fs = require('fs');
import { configService } from '../src/config';
fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
);
