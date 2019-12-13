export default {
  API: {
    MostPollutedCites:
      'https://api.openaq.org/v1/cities?limit=10&order_by=count&sort=desc',
    WikiApiContentSummary:
      'https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&formatversion=2&prop=extracts&redirects=1&exintro=1&explaintext=1',
  },

  STATEMETS: {
    findCitiesPlaceholder: 'Szukaj miast w...',
  },
  errorMessage: {
    noDescription: 'Nie ma informacji o tym mieście',
  },
};
