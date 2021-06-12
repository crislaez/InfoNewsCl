import { createAction, props, union} from '@ngrx/store';
import { News } from '../models';

export const loadNews = createAction('[News] Load news', props<{perPage: string}>());
export const saveNews = createAction('[News] Save news', props<{news: News[], count?: number, limit?: number, offset?: number, total?: number,}>());

export const loadSearchNews = createAction('[News] Load search news', props<{search: string}>());
export const saveSearchNews = createAction('[News] Save search news', props<{news: News[]}>());
export const deleteSearchNews = createAction('[News] Delete search news');

const all = union({
  loadNews,
  saveNews,
  loadSearchNews,
  saveSearchNews,
  deleteSearchNews
})

export type NewsActionsUnion = typeof all;
