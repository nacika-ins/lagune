import { fetchAccount } from '@/actions/accounts';
import Button from '@/components/button';
import Mastodon from '@lagunehq/core';
import * as React from 'react';

export interface Props {
  account?: Mastodon.Account;
  accountId: string;
  fetchAccount: typeof fetchAccount;
}

export default class AccountToggleButton extends React.PureComponent<Props> {

  public componentDidMount () {
    if ( !this.props.account ) {
      this.props.fetchAccount(this.props.accountId);
    }
  }

  public render () {
    const { account } = this.props;

    if ( !account ) {
      return <div />;
    }

    return (
      <div className='account-toggle-button'>
        <Button className='account-toggle-button__button' text={account.display_name} skeleton>
          <img src={account.avatar_static} alt={account.display_name} />
        </Button>
      </div>
    );
  }

}
