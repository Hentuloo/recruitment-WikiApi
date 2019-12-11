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
export const getWikiDescriptionsByTitles = async (
  titles,
  callBack,
) => {
  try {
    const encodedTitles = encodeURIComponent(titles.join('|'));
    const { data } = await axios.get(
      `${Constants.API.WikiApiContentSummary}&titles=${encodedTitles}`,
    );
    return callBack(null, data);
  } catch (err) {
    return callBack(err, null);
  }
};
