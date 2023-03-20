import { takeEvery, put, call } from '@redux-saga/core/effects';
import { GET_LATEST_NEWS } from '../constants';
import { getLatestNews } from '../../api';
import { setLatestNews } from '../actions/actionsCreator';

export function* handleLatestNews() {
  const { hits } = yield call(getLatestNews, 'react'); // call  - останавливает сагу до тех пор пока не будет promise resolve
  yield put(setLatestNews(hits));
}

export function* watchClickSaga() {
  yield takeEvery(GET_LATEST_NEWS, handleLatestNews); // take ждет вызов actionа INCREASE_COUNT, чтобы выполнить код, который ниже. take - блокирующий эффект который следит за экшеном. И разблокирует вызов следующего кода, если вызов этого экшена произойдет
}

export default function* rootSaga() {
  yield watchClickSaga(); // когда загрузится приложение, произойдет инициализация редакс стора, в мидлваре будет создана корневая сага rootSaga, которая в свою очередь вызовет watchClickSaga
}
