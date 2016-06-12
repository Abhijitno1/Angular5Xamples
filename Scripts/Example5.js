//Create the Angular application
var app = angular.module("switchableGrid", ['ngResource']);

//Create the service
app.factory("instagram", function ($resource) {
    return {
        fetchPopular: function (callback) {
            var callUrl = "https://api.instagram.com/api/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK";
            var api = $resource(callUrl, { client_id: '642176ece1e7445e99244cec26f4de1f' },
                { fetch: { method: 'JSONP'} });

            api.fetch(function (response) {
                callback(response.data);
            });
        }
    };
});

function SwitchableGridController($scope, instagram) {
    $scope.layout = 'grid';

    //Dummy data for initialization
    $scope.pics = [{
        link: 'http://tutorialzine.com/2013/07/50-must-have-plugins-for-extending-twitter-bootstrap/',
        images: {
            low_resolution: { url: 'img/009_HighPriority_128x128_72.png' },
            thumbnail: { url: 'img/009_HighPriority_48x48_72.png' }
        },
        caption: { text: '50 must have plugins for extending twitter bootstrap' }
    },
		{
		    link: 'http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/',
		    images: {
		        low_resolution: { url: 'img/010_LowPriority_128x128_72.png' },
		        thumbnail: { url: 'img/010_LowPriority_48x48_72.png' }
		    },
		    caption: { text: 'mini AJAX fle upload form' }
		}
	];
    
    instagram.fetchPopular(function (picData) {
        $scope.pics = picData;
    });
    
}

