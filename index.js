const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

//for adding pagination
// let search = '';
// let pageToken = '';

function getDataFromApi(searchTerm, callback) {
	const params = {
		//type and structure of data
		part: 'snippet',
		//authorizes to get data
		key: 'AIzaSyC3CvFT1jpGyiMXTEtXlX6Kn2z02NwIycU',
		q: searchTerm
		//id of page of results
		// pageToken: pageToken
	}
	$.getJSON(
		YOUTUBE_SEARCH_URL, 
		params,
		callback
	);
}

function renderResult(result) {
	return `
		<div>
			<a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>
		</div>
		`;
}

function displayYouTubeSearchData(data) {
	const results = data.items.map((item, index) =>
		renderResult(item));
	console.log(data.items[0]);
	$('.js-search-results').html(results);
}

function watchSubmit() {
	$('.js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();
		//clear out the input
		queryTarget.val("");
		getDataFromApi(query, displayYouTubeSearchData);
	});
}

$(watchSubmit);

$(".js-search-results").click(function() {
	console.log('clicked!');
});