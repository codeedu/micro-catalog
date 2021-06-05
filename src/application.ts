import {BootMixin} from '@loopback/boot';
import {Application, ApplicationConfig} from '@loopback/core';
import {RestExplorerBindings} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {RabbitmqServer} from './servers';
import {RestBindings, RestComponent, RestServer} from '@loopback/rest';
import {
  EntityComponent,
  RestExplorerComponent,
  ValidatorsComponent,
} from './components';
import {ApiResourceProvider} from './providers/api-resource.provider';
import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  TokenServiceBindings,
} from '@loopback/authentication-jwt';
import {JWTService} from './services/auth/jwt.service';
import {
  AuthorizationComponent,
  AuthorizationDecision,
  AuthorizationTags,
} from '@loopback/authorization';
import {SubscriberAuthorizationProvider} from './providers/subscriber-authorization.provider';

export class MicroCatalogApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(Application)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    options.rest.sequence = MySequence;
    this.component(RestComponent);
    const restServer = this.getSync<RestServer>('servers.RestServer');
    restServer.static('/', path.join(__dirname, '../public'));

    //Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.bind(RestBindings.SequenceActions.SEND).toProvider(
      ApiResourceProvider,
    );

    this.component(RestExplorerComponent);
    this.component(ValidatorsComponent);
    this.component(EntityComponent);
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    const bindings = this.component(AuthorizationComponent);

    this.configure(bindings.key).to({
      precedence: AuthorizationDecision.DENY,
      defaultDecision: AuthorizationDecision.DENY,
    });

    this.bind('authorizationProviders.subscriber-provider')
      .toProvider(SubscriberAuthorizationProvider)
      .tag(AuthorizationTags.AUTHORIZER);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.servers([RabbitmqServer]);
  }

  async boot() {
    await super.boot();

    // const categoryRepo = this.getSync('repositories.CategoryRepository');
    // // @ts-ignore
    // const category = await categoryRepo.find({where: {id: '1-cat'}});
    // console.log(category);
    // // @ts-ignore
    // categoryRepo.updateById(category[0].id, {
    //   ...category[0],
    //   name: 'Funcionando no Loopback',
    // });
    // const validator = this.getSync<ValidatorService>('services.ValidatorService');
    // try {
    //   await validator.validate({
    //     data: {
    //       id: ['1-cat', '2-cat']
    //     },
    //     entityClass: Category
    //   })
    // } catch (e) {
    //   console.dir(e, { depth: 8 })
    // }

    // try {
    //   await validator.validate({
    //     data: {},
    //     entityClass: Genre
    //   })
    // }catch (e) {
    //   console.dir(e, {depth: 8})
    // }
  }
}
