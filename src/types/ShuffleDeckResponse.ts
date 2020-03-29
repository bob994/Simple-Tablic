import { GenericResponse } from './GenericResponse';

export interface ShuffleDeckResponse extends GenericResponse {
  shuffled: boolean;
}
