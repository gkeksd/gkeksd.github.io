const searchClient = algoliasearch('YOUR_ALGOLIA_APPLICATION_ID', 'YOUR_SEARCH_ONLY_API_KEY');

const search = instantsearch({
  indexName: 'YOUR_INDEX_NAME',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: '<div>{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</div>',
    },
  }),
]);

search.start();