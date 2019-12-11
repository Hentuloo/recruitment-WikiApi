import axios from 'axios';

import Constants from 'config/Constants';

export const getMostPollutedCites = async (countryCode, callBack) => {
  try {
    const { data } = await axios.get(
      `${Constants.API.MostPollutedCites}&country=${countryCode}`,
    );
    return callBack(null, data);
  } catch (err) {
    // console.log(err)
    const { error } = err.response.data;
    return callBack(error, null);
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
    // console.log(err)
    const { code } = err.response.errors[0];
    return callBack(code, null);
  }
};
