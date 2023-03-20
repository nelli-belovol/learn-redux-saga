import { SET_LATEST_NEWS } from '../constants';

const initState = {
  latestNews: [],
};

const news = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_LATEST_NEWS:
      return { ...state, latestNews: [...state.latestNews, ...payload] };

    default:
      return state;
  }
};

export default news;
