import { createReducer, on  } from '@ngrx/store';
import { NewsActions } from '../actions';
import { News } from '../models';

// interface Status {
//   pending?: boolean;
//   error?: string;
// }

export interface State{
  news?: News[];
  searchsNews?: News[];
  pending?: boolean;
  count?: number;
  limit?: number;
  offset?: number;
  total?: number;
}

const initialState: State = {
  news: [],
  searchsNews: [],
  pending: false,
  count: 0,
  limit: 0,
  offset: 0,
  total: 0,
}

const NewsReducer = createReducer(
  initialState,
  on(NewsActions.loadNews, (state) => ({...state, pending: true})),
  on(NewsActions.saveNews, (state, { news, count, total, type, limit, offset }) => ({...state, news:[...state?.news, ...news], count, total, type, limit, offset, pending: false })),

  on(NewsActions.loadSearchNews, (state) => ({...state, pending: true})),
  on(NewsActions.saveSearchNews, (state, { news }) => ({...state,searchsNews: news, pending: false })),

  on(NewsActions.deleteSearchNews, (state) => ({...state, searchsNews:[]})),

);

export function reducer(state: State | undefined, action: NewsActions.NewsActionsUnion){
  return NewsReducer(state, action);
}


export const getNews = (state: State) => state?.news;
export const getSearchNews = (state: State) => state?.searchsNews;
export const getPending = (state: State) => state?.pending;
export const getCount = (state: State) => state?.count;
export const getLimit = (state: State) => state?.limit;
export const getOffset = (state: State) => state?.offset;
export const getTotal = (state: State) => state?.total;
