import {whoScoredApi} from '../src';

describe('Searching for teams', () => {

	test('results not null', async (done) => {
		const results = await whoScoredApi.search('Ipswich');

		expect(results).not.toBeNull();
		done();
	});
});
