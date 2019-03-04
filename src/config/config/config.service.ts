import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  get mongodbUri(): string {
    return this.envConfig.MONGODB_URI;
  }

  get tokenSecret(): string {
    return this.envConfig.TOKEN_SECRET;
  }

  get tokenExpiresIn(): string {
    return this.envConfig.TOKEN_EXPIRES_IN;
  }

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3000),
      MONGODB_URI: Joi.string().required(),
      TOKEN_SECRET: Joi.string().required(),
      TOKEN_EXPIRES_IN: Joi.string().default('60d'),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}
