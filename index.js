const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

//for adding pagination
let search = '';
let pageToken = '';

function getDataFromApi(searchTerm, pageToken = null) {
	const params = {
		//type and structure of data
		part: 'snippet',
		//authorizes to get data
		key: 'AIzaSyC3CvFT1jpGyiMXTEtXlX6Kn2z02NwIycU',
		q: searchTerm,
		//id of page of results
		pageToken: pageToken
	}
	$.getJSON(
		YOUTUBE_SEARCH_URL, 
		params, 
		function(data){
			let results = [];
			console.log(data);
			data.items.forEach(function(item) {
				let resultString = renderResult(item);
				results.push(resultString);
			});
		console.log(results);
		}
	);

}
getDataFromApi('cats',);
function renderResult(result) {
	return `
		<div>
			<img src="${item.snippet.thumbnails.default.url}">
		</div>
		`;
}

