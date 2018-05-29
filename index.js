let data;
let result;
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
	result = result;
	return `
		<div class="lightbox-trigger" imgid="${result.id.videoId}">
			<img src="${result.snippet.thumbnails.medium.url}">
		</div>
		`;
}

function displayYouTubeSearchData(data) {
	data = data;
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

$(".js-search-results").on("click", ".lightbox-trigger", function() {
	let video_id = $(this).attr("imgid");
	console.log($(this));
	console.log(video_id);
	let image_href = $(this).html();
	if($("#lightbox").length > 0) {
    let url = "https://www.youtube.com/watch?v=" + $(this).attr("imgid");
    console.log(url);
		$("#content").html(image_href);
		$(".js-result-name").attr("href", url);
		$("#lightbox").show();
	} else {
		console.log($(this));
		console.log(video_id);
		let lightbox =
		`<div id="lightbox">
			<p>Click image to play video</p>
			<a class="js-result-name" href="https://www.youtube.com/watch?v=${video_id}" target="_blank"><div id="content">${image_href}
			</div></a>
		</div>`;
		$("body").append(lightbox);
	}
});

$('body').on('click', "#lightbox", function() {
	$('#lightbox').hide();
});