import {
  /* inject, Application, CoreBindings, */
  lifeCycleObserver, // The decorator
  LifeCycleObserver, // The interface
} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CategoryRepository, GenreRepository} from '../repositories';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class UpdateCategoryRelationObserver implements LifeCycleObserver {
  constructor(
    @repository(CategoryRepository) private categoryRepo: CategoryRepository,
    @repository(GenreRepository) private genreRepo: GenreRepository,
  ) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    this.categoryRepo.modelClass.observe(
      'after save',
      async ({where, data, isNewInstance, ...other}) => {
        if (isNewInstance) {
          return;
        }

        await this.genreRepo.updateRelation('categories', data);
      },
    );
  }

  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
