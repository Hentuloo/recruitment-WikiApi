import axios from 'axios';

import Constants from 'config/Constants';

export const getMostPollutedCites = async (countryCode, callBack) => {
  try {
    const { data } = await axios.get(
      `${Constants.API.MostPollutedCites}&country=${countryCode}`,
    );
    return callBack(null, data);
  } catch (err) {
    return callBack(err, null);
  }
};
