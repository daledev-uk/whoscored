import {TeamSearchResult} from './teamSearchResult';
import {PlayerSearchResult} from './playerSearchResult';

export interface SearchResults {
	teams: TeamSearchResult[];
	players: PlayerSearchResult[];
}
