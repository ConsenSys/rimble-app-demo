import React from "react";
import styled from 'styled-components'
import { Card, Text, Table, Pill, Link } from "rimble-ui";

const TransactionTable = styled(Table)`
  & {
    display: block;
    width: 100%;
    overflow: auto;
    border-width: 0;
  }

  th,
  td {
    border: solid;
    border-width: 1px;
    border-color: inherit;
    padding: 0 1.5rem;
  }
`;

class TransactionsCard extends React.Component {
  
  getTimeDifference = (startTime, currentTime) => {
    let timeDiff = currentTime - startTime;
    return timeDiff;
  }

  formatToMinSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    return (
      <Card>
        <Text fontWeight={3} mb={3}>
          Activity (Transactions):
        </Text>

        <TransactionTable>

          <thead>
            {Object.keys(this.props.transactions).length > 0 ? (
              <tr>
                <th>Initialized</th>
                <th>Timestamps</th>
                <th>Confirmation count</th>
                <th>Total elapsed time</th>
                <th>Etherscan link</th>
              </tr>
            ) : null}
        </thead>

          <tbody>
            {Object.keys(this.props.transactions).length < 1 ? (
              <Text textAlign={"center"} p={3}>
                No transactions yet. Increase or decrease the smart contract value
                to start a transaction.
              </Text>
            ) : (
              Object.keys(this.props.transactions).map((keyName, keyIndex) => {
                let txHash = "";
                if (this.props.transactions[keyName].transactionHash) {
                  txHash = this.props.transactions[
                    keyName
                  ].transactionHash.toString();
                  // const txStart = txHash.substr(0, 7);
                  // const txEnd = txHash.substr(txHash.length - 4);
                  // txHash = txStart + "..." + txEnd;
                }

                let eventCreated = new Date(this.props.transactions[keyName].created);
                let eventUpdated = this.props.transactions[keyName].lastUpdated;
                
                const timestamps = this.props.transactions[keyName].timestamps;
                return (
                  <tr key={keyIndex}>
                    <td>
                      {eventCreated.getHours()}:{eventCreated.getMinutes()}.{eventCreated.getSeconds()}
                    </td>
                    <td>
                      {Object.keys(timestamps).map((timestampName, timestampIndex) => {
                        const entry = timestamps[timestampName];
                        const formattedTime = this.formatToMinSeconds(this.getTimeDifference(eventCreated, entry.timestamp));

                        return (
                          <pre key={timestampIndex}>
                            {entry.state}: {formattedTime}
                          </pre>
                        )
                      })}
                    </td>
                    <td>
                      {this.props.transactions[keyName].confirmationCount}
                    </td>
                    <td>
                      {eventUpdated && this.formatToMinSeconds(this.getTimeDifference(eventCreated, eventUpdated))}
                    </td>
                    <td>
                      <Link href={'//rinkeby.etherscan.io/tx/'+txHash} target='_blank'>
                        {txHash}
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

        </TransactionTable>

      </Card>
    );
  }
}

export default TransactionsCard;
