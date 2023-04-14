import React, {useContext} from 'react'
import { AppContext } from '../contexts/context';
import _ from 'lodash'
import UseHttpRequest from '../components/use-http-request';
import CustomTable from '../components/custom-table';

export default function Positions() {
  const context = useContext(AppContext);

  const { isLoading, errorMessage, executeRequest, responseData } = UseHttpRequest(async () => (
    context.tastytradeApi.balancesAndPositionsService.getPositionsList(context.accountNumbers![0])
  ), true)

  if (isLoading) {
      return <div>Loading...</div>
    }

  const positions = responseData

  if (_.isNil(context.accountNumbers)) {
    return <p>Loading...</p>
  }

  if (_.isEmpty(positions)) {
    return (
      <div>
        <h1>Transactions for {context.accountNumbers[0]}</h1>
        No Positions
        </div>
      )
    }

  return (
  <div>
      <h1>Positions for {context.accountNumbers[0]}</h1>
        <CustomTable tableInformation={positions}/>
  </div>
  );
};
