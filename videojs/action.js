// var player = videojs('my-player');

// // Create a track object.
// var track = new videojs.AudioTrack({
//   id: 'my-spanish-audio-track',
//   kind: 'translation',
//   label: 'Spanish',
//   language: 'es'
// });

// // Add the track to the player's audio track list.
// player.audioTracks().addTrack(track);

// console.log(player)

var player = videojs('my-player');
let tracks = player.audioTracks();

// listen to the change event
tracks.addEventListener('change', function() {

  // print the currently enabled AudioTrack label
  for (let i = 0; i < tracks.length; i++) {
    let track = tracks[i];

    if (track.enabled) {
      console.log(track.label);
      return;
    }
  }
});
//     //player.play();

//     function switchvideo(){
//         player.src({
//             src: '/videojs/videoCSIS/output.m3u8',
//             type: 'application/x-mpegURL',
//             withCredentials: true
//         });
//         player.play();
//     }

// $(document).ready(function() {
//   $("#btn").on("click", function() {
//     $("#my-player").html("<source src='"+ $("#url").val() +"' type='application/x-mpegURL'>");
//     // var ply = videojs("video");
//     // ply.play();
//     player.play();
//   });
// });