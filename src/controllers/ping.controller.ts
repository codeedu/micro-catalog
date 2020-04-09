import {Request, RestBindings, get, ResponseObject} from '@loopback/rest';
import {inject} from '@loopback/context';
import {CategoryRepository} from "../repositories";
import {repository} from "@loopback/repository";
//import {ClassDecoratorFactory, MetadataInspector} from '@loopback/metadata';
/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

// interface MyClassMetaData {
//   name: string;
// }
//
// function myClassDecorator(spec: MyClassMetaData): ClassDecorator{
//   const factory = new ClassDecoratorFactory<MyClassMetaData>(
//       'medata-data-my-class-decorator',
//       spec
//   );
//   return factory.create();
// }

/**
 * A simple controller to bounce back http requests
 */
// @acl({
//   role: 'ADMIN',
// })
//@myClassDecorator({name: 'code education'})
export class PingController {
  constructor(
      @inject(RestBindings.Http.REQUEST) private req: Request,
      @repository(CategoryRepository) private categoryRepo: CategoryRepository
      //@repository(CategoryRepository) private categoryRepo: CategoryRepository
  ) {
  }

  // Map to `GET /ping`
  @get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack11111',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
  //avj module

  @get('/categories')
  async index(){
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {
      id: '2',
          name: 'minha primeira categoria',
        // eslint-disable-next-line @typescript-eslint/camelcase
        created_at: new Date(),
        // eslint-disable-next-line @typescript-eslint/camelcase
        updated_at: new Date(),
      //description: 'minha descrição'
    }
    await this.categoryRepo.create(data);

    return this.categoryRepo.find()
  }
}

// const meta = MetadataInspector.getClassMetadata<MyClassMetaData>(
//     'medata-data-my-class-decorator',
//     PingController
// );
//
// console.log(meta);

