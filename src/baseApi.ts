import axios, {AxiosError} from 'axios';

export abstract class BaseApi {

	constructor() {
		axios.defaults.baseURL = 'https://www.whoscored.com';

		axios.defaults.headers.common.Accept = 'text/html, application/xhtml+xml, */*';
		axios.defaults.headers.common['Accept-Language'] = 'en-GB';
		axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko';
		axios.defaults.headers.common.Host = 'www.whoscored.com';
		axios.defaults.headers.common.DNT = '1';
		axios.defaults.headers.common.Connection = 'Keep-Alive';
		axios.defaults.headers.common['Cache-Control'] = 'co-cache';

		axios.defaults.maxRedirects = 0;
		axios.defaults.responseType = 'document';
	}

	public async get(url: string): Promise<any> {
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (err) {
			console.log('Error!!!');
			const axiosError = err as AxiosError;
			console.log('Message :', axiosError.message);

			console.log('--------------------------------------------------');
			console.log('Request Headers :', axiosError.request.headers);
			console.log('Error Response Status :', axiosError.response.status);
			console.log('Response Headers :', axiosError.response.headers);
			console.log('Response Data :', axiosError.response.data);
			console.log('--------------------------------------------------');

			if (axiosError.response.status === 302) {
				// Redirect
				const setCookieHeader = axiosError.response.headers['set-cookie'] as string[];
				axios.defaults.headers.common.cookie = setCookieHeader.map((cookie: string) => cookie.split(';')[0]).join('; ');
				return this.get(url);
			}
		}
	}
}
