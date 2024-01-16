import { AddPoster } from './entities/add-poster.entity';
export const posterProviders = [
  {
    provide: 'POSTER_REPOSITORY',
    useValue: AddPoster,
  },
];
