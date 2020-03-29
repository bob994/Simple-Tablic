import ky from 'ky';
import { ShuffleDeckResponse } from '../types/ShuffleDeckResponse';
import { DrawCardResponse } from '../types/DrawCardResponse';

const API_URL = 'https://deckofcardsapi.com/api/deck/';

const api = ky.create({
  prefixUrl: API_URL,
});

const shuffleNewDeck = () => api.get('new/shuffle').json<ShuffleDeckResponse>();

const drawCards = (deck_id: string, n: number) =>
  api.get(`${deck_id}/draw/?count=${n}`).json<DrawCardResponse>();

export default { shuffleNewDeck, drawCards };
