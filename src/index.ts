import parseSearchResults from './parsers/searchResultParser';
import {SearchResults} from './models/searchResults';
import {BaseApi} from './baseApi';

class WhoScoredApi extends BaseApi {

	public async search(term: string): Promise<SearchResults> {
		const searchUrl = `/Search/?t=${term}`;

		const response = await this.get(searchUrl);
		return parseSearchResults(String(response));
	}
}


export const whoScoredApi = new WhoScoredApi();
