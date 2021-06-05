import {JSONSchema7} from 'json-schema';
import {JsonSchema, JsonSchemaWithExtensions} from '@loopback/repository';
declare module 'json-schema' {
  export interface JSONSchema7 {
    exists?: string[];
  }
}

declare module '@loopback/repository' {
  export interface JsonSchemaWithExtensions extends JsonSchema {
    exists?: string[];
  }
}
