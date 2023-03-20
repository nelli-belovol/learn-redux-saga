import { takeEvery, put, call, fork, all, spawn } from '@redux-saga/core/effects';
import {
  GET_LATEST_NEWS,
  GET_POPULAR_NEWS,
  SET_LATEST_NEWS_ERROR,
  SET_POPULAR_NEWS_ERROR,
} from '../constants';
import { getLatestNews, getPopularNews } from '../../api';
import { setLatestNews, setPopularNews } from '../actions/actionsCreator';

export function* handleLatestNews() {
  try {
    const { hits } = yield call(getLatestNews, 'react');
    yield put(setLatestNews(hits));
  } catch (error) {
    yield put({ type: SET_LATEST_NEWS_ERROR, payload: 'Error fetching latest news' });
  }
}

export function* handlePopularNews() {
  try {
    const { hits } = yield call(getPopularNews); // call ждет пока promise вернет resolve
    yield put(setPopularNews(hits));
  } catch (error) {
    yield put({ type: SET_POPULAR_NEWS_ERROR, payload: 'Error fetching popular news' });
  }
}

// export function* handleNews() {
//   yield fork(handleLatestNews); // fork не является блокирующим эффектом, поэтому выполнит handleLatestNews и handlePopularNews одновременно
//   yield fork(handlePopularNews);
//   // yield all([call(handleLatestNews), call(handlePopularNews)]);
// }

// export function* watchClickSaga() {
//   yield takeEvery(GET_NEWS, handleNews); // take ждет вызов actionа INCREASE_COUNT, чтобы выполнить код, который ниже. take - блокирующий эффект который следит за экшеном. И разблокирует вызов следующего кода, если вызов этого экшена произойдет
// }

export function* watchPopularSaga() {
  yield takeEvery(GET_POPULAR_NEWS, handlePopularNews);
}

export function* watchLatestSaga() {
  yield takeEvery(GET_LATEST_NEWS, handleLatestNews);
}

export default function* rootSaga() {
  // yield watchClickSaga(); // когда загрузится приложение, произойдет инициализация редакс стора, в мидлваре будет создана корневая сага rootSaga, которая в свою очередь вызовет watchClickSaga

  yield all([fork(watchPopularSaga), fork(watchLatestSaga)]);
}
