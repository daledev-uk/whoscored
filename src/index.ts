
import axios from 'axios';


class WhoScoredApi {

    public async search(term: string) : Promise<void> {
        const searchUrl = `https://www.whoscored.com/Search/?t=${term}`;

        try {
        console.log(`Searching for ${term}`);
        const response = await axios.get(searchUrl, {
          headers : {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
          }
        });

        console.log('response', response);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log('---------------------------------------------');
                console.log(error.response.status);
                console.log('---------------------------------------------');
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
        }
    }
}


export const whoScoredApi = new WhoScoredApi();
