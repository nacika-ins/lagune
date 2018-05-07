import { call, select, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { RootState } from '@/reducers';
import {
  fetchAuthorizationUrl,
  fetchAuthorizationUrlProcess,
  verifyCode,
  verifyCodeProcess,
} from '@/actions/login';
import * as AuthClient from '@/auth';

const fetchAuthorizationUrlWorker = bindAsyncAction(fetchAuthorizationUrlProcess)(
  function* (host): SagaIterator {
    const result: AuthClient.Url = yield call(AuthClient.fetchUrl, host);

    // Open authorization page in the default browser
    window.open(result.url);

    return result;
  },
);

const verifyCodeWorker = bindAsyncAction(verifyCodeProcess)(
  function* (code): SagaIterator {
    const host: string = yield select((state: RootState) => state.login.host);
    const result: AuthClient.Credentials = yield call(AuthClient.verify, host, code);

    return result;
  },
);

export default function* loginSaga () {
  yield takeEvery<Action<string>>(fetchAuthorizationUrl, ({ payload }) => fetchAuthorizationUrlWorker(payload));
  yield takeEvery<Action<string>>(verifyCode,          ({ payload }) => verifyCodeWorker(payload));
}
