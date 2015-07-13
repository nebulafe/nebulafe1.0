define(function(require, exports, moudle) {
  alifenxi.track("course_video_view" ,{
    "course_name" : $('#course_name').html()
  });
  require("js/widget/jquery.jplayer.min.js");
  require("js/widget/jplayer.playlist.min.js");
  $(function(){
      new jPlayerPlaylist({
    jPlayer: "#jquery_jplayer_1",
    cssSelectorAncestor: "#jp_container_1"

  }, res, {
    swfPath: "../widget",
    supplied: "webmv, ogv, m4v",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true,
    size: {
      width: "640px",
      height: "360px",
      cssClass: "jp-video-360p"
    }
  });
  })
})