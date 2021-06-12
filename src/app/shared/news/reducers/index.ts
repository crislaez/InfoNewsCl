import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNews from './news.reducer';

export const newsKey = 'news';

export interface State {
  [newsKey]: fromNews.State
}

export const reducer = fromNews.reducer;

export const getNewsState = createFeatureSelector<State, fromNews.State>(newsKey);


export const getNews = createSelector(
  getNewsState,
  fromNews.getNews
);

export const getSearchNews = createSelector(
  getNewsState,
  fromNews.getSearchNews
);

export const getPending = createSelector(
  getNewsState,
  fromNews.getPending
);

export const getCount = createSelector(
  getNewsState,
  fromNews.getCount
);

export const getLimit = createSelector(
  getNewsState,
  fromNews.getLimit
);

export const getOffset = createSelector(
  getNewsState,
  fromNews.getOffset
);

export const getTotal = createSelector(
  getNewsState,
  fromNews.getTotal
);

export const getNew = (newsTitle: string) =>  createSelector(
  getNews,
  (news) => news.find( ({title}) => title === newsTitle)
);

export const getSearchNew = (newsTitle: string) =>  createSelector(
  getSearchNews,
  (news) => news.find( ({title}) => title === newsTitle)
);

