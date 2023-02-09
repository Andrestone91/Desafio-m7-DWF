import algoliasearch from 'algoliasearch';

// For the search only version
// import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('TZQ6GRJNQY', '7e8474ccf739342b1335a65aa017d1f3');
const index = client.initIndex('pets');
export { index }