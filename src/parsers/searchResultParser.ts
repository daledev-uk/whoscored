import {SearchResults} from '../models/searchResults';
import {JSDOM} from 'jsdom';
import {TeamSearchResult} from '../models/teamSearchResult';
import {PlayerSearchResult} from '../models/playerSearchResult';

class SearchResultParser {
	public teams: TeamSearchResult[] = [];
	public players: PlayerSearchResult[] = [];
	private readonly html: string;

	constructor(html: string) {
		this.html = html;
		this.parse();
	}

	private parse(): void {
		if (this.html) {
			const dom = new JSDOM(this.html);
			const resultsElement: HTMLDivElement = dom.window.document.querySelector('.search-result');

			for (let i = 0; i < resultsElement.children.length; i += 2) {
				const labelElement = resultsElement.children.item(i);
				const resultTableElement = resultsElement.children.item(i + 1) as HTMLTableElement;

				if (labelElement.textContent === 'Teams:') {
					this.parseTeams(resultTableElement);
				} else if (labelElement.textContent === 'Players:') {
					this.parsePlayers(resultTableElement);
				}
			}
		}
	}

	private parseTeams(resultTable: HTMLTableElement) {
		const rows = resultTable.getElementsByTagName('tr');

		for (let i = 1; i < rows.length; i++) {
			const row = rows.item(i);
			const cells = row.getElementsByTagName('td');

			const id = cells.item(0).children.item(0).getAttribute('href');
			const name = cells.item(0).children.item(0).textContent;
			const country = cells.item(1).children.item(0).textContent;

			this.teams.push({ id, name, country });
		}
	}

	private parsePlayers(resultTable: HTMLTableElement) {
		const rows = resultTable.getElementsByTagName('tr');

		for (let i = 1; i < rows.length; i++) {
			const row = rows.item(i);
			const cells = row.getElementsByTagName('td');

			const id = cells.item(0).children.item(0).getAttribute('href');
			const name = cells.item(0).children.item(0).textContent;
			const team = cells.item(1).children.item(0)?.textContent;
			const ageString = cells.item(2).children.item(0)?.textContent;
			const age = ageString ? Number(ageString) : null;

			this.players.push({ id, name, team, age });
		}
	}
}

export default function parseSearchResults(html: string): SearchResults {
	const parser = new SearchResultParser(html);
	return {
		teams: parser.teams,
		players: parser.players
	};

}
