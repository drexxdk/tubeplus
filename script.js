// vanilla javascript to increase speed
var isRoot = location.pathname == "/";
var isLocalhost = document.location.hostname == "localhost";
if (isRoot && !isLocalhost) {
    window.location.replace("http://www.tubeplus.ag/browse/tv-shows/Last/ALL/");
}

$(document).ready(function () {
    var tv_shows = $("#logo + #header").length,
		right = $("#right"),
		back = $("#header > #headnav > ul > li:nth-child(3) > a");
    if (tv_shows === 1) {
        var leftTop = $("#list_head"),
			text = leftTop.text().trim(),
			dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        leftTop.html("<p>" + text + "</p>");
        leftTop.prepend($("#searchnav"));
        leftTop.append('<div id="toggle"><span></span></div>');
        leftTop.children("#toggle").prepend(back);
        $("#main").on("click", "#toggle span", function () {
            $(this).toggleClass("open");
            right.toggleClass("open");
        });
        var list = $("#list_body"),
            dates = [];
        list.children(".list_item").each(function () {
            var $this = $(this),
                date = $this.find("> .right > .frelease").html();
            if ($.inArray(date, dates) === -1) {
                var parts = date.split('-'),
                    dayName = dayNames[new Date(parts[2], parts[1] - 1, parts[0]).getDay()],
                    month = monthNames[parts[1] - 1],
                    newDate = dayName + ", " + parts[2] + " " + month + " " + parts[0];
                list.append('<div id="date-' + date + '" class="date-container"><p>' + newDate + '</p><div></div></div>');
                dates.push(date);
            }
            list.children("#date-" + date).children("div").append($this);
        });
    }
    else {
        var title = $("#title"),
			text = title.children("h1").text().trim();
        title.html("<div><h1>" + text + "</h1></div>");
        title.prepend('<span id="toggle" class="open"></span>');
        $("#main").on("click", "#toggle", function () {
            $(this).toggleClass("open");
            $("#left").toggleClass("hidden");
        });
        title.append(back);
        right.prepend(title);
        right.append('<div id="videoplayer"><div><iframe frameborder="0" scrolling="auto"></iframe></div></div>');

        var videoplayer = $("#videoplayer > div > iframe");
        $("#seasons > a").each(function () {
            var $this = $(this),
                text = $this.text();
            text = text.substring(text.indexOf(" ") + 1);
            $this.text(text);
        });
        $("#left > #links_list > li:first-child").removeClass("visited");
        $("#left > #links_list > li > .link > a").each(function () {
            var $this = $(this),
                url = "\"" + $this.attr("onclick") + "\"";
            if (url != undefined) {
                url = url.substring(url.indexOf("'") + 1);
                url = url.substring(0, url.indexOf("'"));
                $this.parent().parent().attr("data-url", url);
                $this.removeAttr("href");
            }
            $this.removeAttr('onclick');
        });
        $("body").append('<div id="embed-data"></div>');
        $("#left > #links_list > li").click(function () {
            var $this = $(this),
                url = $this.attr("data-url");
            videoplayer.attr("src", url);
            $this.addClass("visited");
        });
        var links = $("#left > #links_list");
        if (links.length === 1) {
            var params = links.find(".params");
            params.children("span").remove();
            params.each(function () {
                var $this = $(this),
                    text = $this.text().trim(),
                    date = text.substr(0, text.indexOf(' ')),
                    host = text.substring(text.lastIndexOf(' ') + 1);
                $this.parent().attr("data-id", host + date);
                $this.html("<span>" + host + "</span><span>" + date + "</span");
            });
            links.children().sort(sort_li).appendTo(links);
            function sort_li(a, b) {
                return ($(b).attr("data-id")) < ($(a).attr("data-id")) ? 1 : -1;
            }
        }
    }
    $("body").attr('id', "ready");
});