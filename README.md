
ABOUT Web Scraper, New York Times Edition:

Web Scraper, New York Times Edition is a MongoDB homework assignment. Instructions were as follows:

1. Create an app that accomplishes the following:

-Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article:


 * Headline - the title of the article

 * Summary - a short summary of the article

 * URL - the url to the original article

 * Feel free to add more content to your database (photos, bylines, and so on).

-Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.

-Beyond these requirements, be creative and have fun with this!



TECH USED: HTML, CSS, JavaScript, MongoDB

HIGHLIGHT CODE:


app.get("/scrape", function(req, res) {


    //localhost:3000/scrape here

    request("https://www.nytimes.com/", function(error, response, body) {

        if(error){

            throw error;

        }

        var $ = cheerio.load(body);

        var articles = [];

        $("article h2.story-heading").each(function(i, el){

            var article = {};

            var a = $(this).find("a");

            article.headline = $(a).text();

            article.link = $(a).attr("href");

            var p = $(this).siblings("p.summary").first();

            article.summary = $(p).text();

            articles.push(article);

        })

        // res.json(articles);

        res.render("new", {articles});

    });

});



};

CONCLUSION: 
	In completing this assignment, I got an introduction into how to use MongoDB and learned how to make a web scraper.

GRADE: B+

INSTRUCTOR COMMENT:

from David Hammond 
April 14th, 10:26 am

Very nice UI, I enjoyed the flow of it. Articles appeared to save fine in the UI but when I clicked saved articles, it gave me an internal server error. Only feature I was missing was the add comment feature. Otherwise all is working as expected! Good Work!
