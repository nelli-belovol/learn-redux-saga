import { takeEvery, put, call, fork, all } from '@redux-saga/core/effects';
import { GET_NEWS } from '../constants';
import { getLatestNews, getPopularNews } from '../../api';
import { setLatestNews, setPopularNews } from '../actions/actionsCreator';

export function* handleLatestNews() {
  const { hits } = yield call(getLatestNews, 'react');
  yield put(setLatestNews(hits));
}

export function* handlePopularNews() {
  const { hits } = yield call(getPopularNews); // call ждет пока promise вернет resolve
  yield put(setPopularNews(hits));
}

export function* handleNews() {
  // yield fork(handleLatestNews); // fork не является блокирующим эффектом, поэтому выполнит handleLatestNews и handlePopularNews одновременно
  // yield fork(handlePopularNews);
  yield all([call(handleLatestNews), call(handlePopularNews)]);
}

export function* watchClickSaga() {
  yield takeEvery(GET_NEWS, handleNews); // take ждет вызов actionа INCREASE_COUNT, чтобы выполнить код, который ниже. take - блокирующий эффект который следит за экшеном. И разблокирует вызов следующего кода, если вызов этого экшена произойдет
}

export default function* rootSaga() {
  yield watchClickSaga(); // когда загрузится приложение, произойдет инициализация редакс стора, в мидлваре будет создана корневая сага rootSaga, которая в свою очередь вызовет watchClickSaga
}
