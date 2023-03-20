import { SET_LATEST_NEWS_ERROR, SET_POPULAR_NEWS_ERROR } from '../constants';

const initState = {
  latestNewsError: '',
  popularNewsError: '',
};

const errors = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_LATEST_NEWS_ERROR:
      return { ...state, latestNewsError: payload };
    case SET_POPULAR_NEWS_ERROR:
      return { ...state, popularNewsError: payload };
    default:
      return state;
  }
};

export default errors;
