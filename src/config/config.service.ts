import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Optional } from '@cores/types';

export interface ConfigService {
  getValue(key: string, throwOnMissing?: boolean): Optional<string>;
  ensureValues(keys: string[]): ConfigService;
  getPort(): number;
  getTypeOrmConfig(): TypeOrmModuleOptions;
}
