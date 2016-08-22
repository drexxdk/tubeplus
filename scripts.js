var is_root = location.pathname == "/";
if (is_root) {
    //window.location.replace("http://www.tubeplus.ag/browse/tv-shows/Last/ALL/");
}

var head = document.head,
	link = document.createElement('link');

link.type = 'text/css';
link.rel = 'stylesheet';
link.href = 'style.css' //'https://draxxdk.github.io/tubeplus/style.css';
head.appendChild(link);

$(document).ready(function () {
    var tv_shows = $("#logo + #header").length;
    var right = $("#right");
    var back = $("#header > #headnav > ul > li:nth-child(3) > a");
    if (tv_shows === 1) {
        var leftTop = $("#list_head");
        var text = leftTop.text().trim();
        leftTop.html("<p>" + text + "</p>");
        leftTop.prepend($("#searchnav"));
        leftTop.append('<div id="toggle"><span></span></div>');

        leftTop.children("#toggle").prepend(back);
        $("#main").on("click", "#toggle span", function () {
            $(this).toggleClass("open");
            right.toggleClass("open");
        });
        //if (window.location.href.indexOf("/browse/tv-shows/Last/ALL/") != -1) {
        var list = $("#list_body");
        var dates = [];
        list.children(".list_item").each(function () {
            var $this = $(this);
            var date = $this.find("> .right > .frelease").html();

            if ($.inArray(date, dates) === -1) {
                var parts = date.split('-');
                var newDate = parts[2] + "-" + parts[1] + "-" + parts[0];
                list.append('<div id="date-' + date + '" class="date-container"><p>' + newDate + '</p><div></div></div>');
                dates.push(date);
            }
            list.children("#date-" + date).children("div").append($this);
        });
        //}
    }
    else {
        var title = $("#title");
        var text = title.children("h1").text().trim();
        title.html("<div><h1>" + text + "</h1></div>");
        title.prepend('<span id="toggle" class="open"></span>');
        $("#main").on("click", "#toggle", function () {
            $(this).toggleClass("open");
            $("#left").toggleClass("hidden");
        });

        title.append(back);
        right.prepend(title);
        right.append('<div id="videoplayer"><iframe frameborder="0" scrolling="auto"></iframe></div>');
        var videoplayer = $("#videoplayer > iframe");
        $("#seasons > a").each(function () {
            var $this = $(this);
            var text = $this.text();
            text = text.substring(text.indexOf(" ") + 1);
            $this.text(text);
        });
        $("#left > #links_list > li:first-child").removeClass("visited");
        $("#left > #links_list > li > .link > a").each(function () {
            var $this = $(this);
            var url = "\"" + $this.attr("onclick") + "\"";
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
            var $this = $(this);
            var url = $this.attr("data-url");
            videoplayer.attr("src", url);
            $this.addClass("visited");
        });
        var links = $("#left > #links_list:visible");
        if (links.length === 1) {
            var params = links.find(".params");
            params.children("span").remove();
            params.each(function () {
                var $this = $(this);
                var text = $this.text().trim();
                var date = text.substr(0, text.indexOf(' '));
                var host = text.substring(text.lastIndexOf(' ') + 1);
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