import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './config.service';

// tslint:disable-next-line:no-var-requires
require('dotenv').config();

class ConfigServiceImpl implements ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = false): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]): ConfigService {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort(): number {
    return parseInt(this.getValue('PORT', true), 10);
  }

  public isProduction(): boolean {
    const mode = this.getValue('NODE_ENV', false);
    return mode.toLowerCase() !== 'dev';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT'), 10),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: ['**/*.entity{.ts,.js}'],

      migrationsTableName: 'migrations',

      migrations: ['database/migrations/*.ts'],

      cli: {
        migrationsDir: 'database/migrations',
      },

      ssl: this.isProduction(),
      // @ts-ignore
      seeds: ['database/seeds/**/*{.ts,.js}'],

      factories: ['database/factories/**/*{.ts,.js}'],
    };
  }
}

const configService = new ConfigServiceImpl(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
