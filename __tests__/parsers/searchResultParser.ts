import parseSearchResults from '../../src/parsers/searchResultParser';
import * as testData from '../testData';

describe('Parsing searching results', () => {

	test('Liverpool search should return 9 teams, 1 player', () => {
		// give
		const html = testData.liverpoolSearchResult();

		// When
		const results = parseSearchResults(html);

		// Then
		expect(results.teams).toHaveLength(9);
		expect(results.players).toHaveLength(1);
	});

	test('Ipswich search should return teams', () => {
		// give
		const html = testData.ipswichSearchResult();

		// When
		const results = parseSearchResults(html);

		// Then
		expect(results.teams).toHaveLength(7);
	});

	test('Messi search should return 4 players', () => {
		// give
		const html = testData.messiSearchResult();

		// When
		const results = parseSearchResults(html);

		// Then
		expect(results.players).toHaveLength(4);
	});
});
