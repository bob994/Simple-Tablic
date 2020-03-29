import { GenericResponse } from './GenericResponse';
import { Card } from './Card';

export interface DrawCardResponse extends GenericResponse {
  cards: Card[];
}
