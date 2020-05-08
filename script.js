$(document).ready(function() {
    $(".onClick").hide();
});

function run() {
    var artist = $("#artistName").val();

    if (artist.length < 1) {
        alert("Please enter an artist name first.");
    } else {
        $.ajax({
            url: 'https://itunes.apple.com/search?term=' + artist,
            dataType: "json",
            success: search
        });
    }
}

function search(data) {
    console.log(data);

    $("#thePreview").empty();
    $("#thePreview").append("<tr>\n" +
        "            <th>#</th>\n" +
        "            <th>Song</th>\n" +
        "            <th>Artist</th>\n" +
        "            <th>Preview</th>\n" +
        "            <th>Album</th>\n" +
        "            <th>Album Art</th>\n" +
        "        </tr>");

    var songs = data.results;
    console.log(songs[0].previewUrl);

    if (songs.length > 0) {
        var o = "";

        for (var i = 0; i < $("#numSongs").val(); i++) {
            var preview = "<audio controls='true' src='" + songs[i].previewUrl + "' id='audio' type='audio/m4a'></audio>";
            var artwork = "<img src='"+ songs[i].artworkUrl100 +"'>";

            o += "<tr>";
            o += "<td>" + (i + 1) + "</td>";
            o += "<td>" + songs[i].trackName + "</td>";
            o += "<td>" + songs[i].artistName + "</td>";
            o += "<td>" + preview + "</td>";
            o += "<td>" + songs[i].collectionName + "</td>";
            o += "<td>" + artwork + "</td>";
            o += "</tr>";
        }

        $("#thePreview").append(o);
        $(".onClick").show();
    } else {
        alert("No results found. Try another search.");
        $("#thePreview").empty();
    }
}