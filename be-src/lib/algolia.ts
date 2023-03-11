import algoliasearch from 'algoliasearch';

// For the search only version
// import algoliasearch from 'algoliasearch/lite';
const clientTKa = process.env.ALGOLIA_API_A
const clientTKb = process.env.ALGOLIA_API_B
const client = algoliasearch(clientTKa, clientTKb);
const index = client.initIndex('pets');
export { index }