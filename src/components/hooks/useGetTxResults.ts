/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";

import { User } from "context/NearProvider/reducer";
import getProvider from "utils/getProvider";

/**
 * Grabs the resulting transaction hash from the url and retrieves the results from NEAR
 * NOTE: Only works with one tx hash at the moment
 */
const useGetTxResults = (user: User | null) => {
  const [txResults, setTxResults] = useState<any>(null);

  useEffect(() => {
    if (location && user) {
      const mintTransactionHash =
        location.search.split("transactionHashes=")[1];

      if (mintTransactionHash) {
        const nearProvider = getProvider();

        nearProvider
          .txStatus(mintTransactionHash, user.accountId)
          .then((result) => {
            setTxResults(result);
          })
          .catch((error) => {
            setTxResults(null);
          });
      }
    }
  }, [user]);

  return txResults;
};

export default useGetTxResults;
