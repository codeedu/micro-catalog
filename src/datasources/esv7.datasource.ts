import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {juggler} from '@loopback/repository';
import dbConfig from './esv7.datasource.config';
import {Client} from 'es6';
@lifeCycleObserver('datasource')
export class Esv7DataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'esv7';

  constructor(config = dbConfig) {
    super(config);
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }

  public async deleteAllDocuments() {
    const index = (this as any).adapter.settings.index;
    const client: Client = (this as any).adapter.db;
    await client.delete_by_query({
      index,
      body: {
        query: {match_all: {}},
      },
    });
  }
}
