import { GenericResponse } from './GenericResponse';
import { ICard } from './ICard';

export interface DrawCardResponse extends GenericResponse {
  cards: ICard[];
}
