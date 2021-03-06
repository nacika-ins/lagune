import {
  fetchAccountProcess,
} from '@/actions/accounts';
import {
  verifyCodeProcess,
} from '@/actions/login';
import Mastodon from '@lagunehq/core';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

function normalizeAccount (state: AccountsState, account: Mastodon.Account|Mastodon.Credentials) {
  return {
    ...state,
    [account.id]: account,
  };
}

export interface AccountsState { [key: string]: Mastodon.Account; }

const initialState: AccountsState = {};

export default reducerWithInitialState<AccountsState>(initialState)
  .case(verifyCodeProcess.done, (state, { result }) => normalizeAccount(state, result.account))
  .case(fetchAccountProcess.done, (state, { result }) => normalizeAccount(state, result));
