import {bind, config, ContextTags, inject} from '@loopback/context';
import {Component} from '@loopback/core';
import {
  createControllerFactoryForClass,
  RestBindings,
  RestServer,
} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerConfig,
} from '@loopback/rest-explorer';
import {ExplorerController} from '@loopback/rest-explorer/dist/rest-explorer.controller';

const swaggerUI = require('swagger-ui-dist');

/**
 * A component providing a self-hosted API Explorer.
 */
@bind({tags: {[ContextTags.KEY]: RestExplorerBindings.COMPONENT.key}})
export class RestExplorerComponent implements Component {
  constructor(
    @inject(RestBindings.SERVER)
    private restServer: RestServer,
    @config()
    restExplorerConfig: RestExplorerConfig = {},
  ) {
    const explorerPath = restExplorerConfig.path ?? '/explorer';

    this.registerControllerRoute('get', explorerPath, 'indexRedirect');
    this.registerControllerRoute('get', explorerPath + '/', 'index');
    if (restExplorerConfig.useSelfHostedSpec !== false) {
      this.registerControllerRoute(
        'get',
        explorerPath + '/openapi.json',
        'spec',
      );
    }

    restServer.static(explorerPath, swaggerUI.getAbsoluteFSPath());

    // Disable redirect to externally hosted API explorer
    restServer.config.apiExplorer = {disabled: true};
  }

  private registerControllerRoute(
    verb: string,
    path: string,
    methodName: string,
  ) {
    this.restServer.route(
      verb,
      path,
      {
        'x-visibility': 'undocumented',
        responses: {},
      },
      ExplorerController,
      createControllerFactoryForClass(ExplorerController),
      methodName,
    );
  }
}
