var app = angular.module("InstantSearch", []);
app.filter("searchFor", function () {
    return function (arr, searchString) {
        if (!searchString) return arr;

        var result = [];
        angular.forEach(arr, function (article) {
            var findIndex = article.title.toLowerCase().indexOf(searchString.toLowerCase());
            if (findIndex > -1) result.push(article);
        });
        return result;
    };
});

function InstantSearchController($scope) {
    $scope.articles = [
		{
		    url: 'http://tutorialzine.com/2013/07/50-must-have-plugins-for-extending-twitter-bootstrap/',
		    title: '50 Must-have plugins for extending Twitter Bootstrap',
		    image: 'img/009_HighPriority_128x128_72.png'
		},
		{
		    url: 'http://tutorialzine.com/2013/08/simple-registration-system-php-mysql/',
		    title: 'Making a Super Simple Registration System With PHP and MySQL',
		    image: 'img/010_LowPriority_128x128_72.png'
		},
		{
		    url: 'http://tutorialzine.com/2013/08/slideout-footer-css/',
		    title: 'Create a slide-out footer with this neat z-index trick',
		    image: 'img/009_HighPriority_128x128_72.png'
		},
		{
		    url: 'http://tutorialzine.com/2013/06/digital-clock/',
		    title: 'How to Make a Digital Clock with jQuery and CSS3',
		    image: 'img/010_LowPriority_128x128_72.png'
		},
		{
		    url: 'http://tutorialzine.com/2013/05/diagonal-fade-gallery/',
		    title: 'Smooth Diagonal Fade Gallery with CSS3 Transitions',
		    image: 'img/009_HighPriority_128x128_72.png'
		},
		{
		    url: 'http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/',
		    title: 'Mini AJAX File Upload Form',
		    image: 'img/010_LowPriority_128x128_72.png'
		},
		{
		    url: 'http://tutorialzine.com/2013/04/services-chooser-backbone-js/',
		    title: 'Your First Backbone.js App – Service Chooser',
		    image: 'img/009_HighPriority_128x128_72.png'
		}
	];
}
