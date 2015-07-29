define(function (require, exports, moudle) {
    alifenxi.track("course_video_view", {
        "course_name": $('#course_name').html()
    });
    var Pager = require('js/widget/pager');
    var commentBtn = $("#comment-submit");
    var commentArea = $("#user-comment-editor");
    var user_avator = ($('#ne_user_avator').val() - 0) || 1;
    var nickname = commentBtn.attr("data-nickname") || $('#ne_user_name').val();
    var userId = $('#ne_user_id').val() ;
    var courseid =  commentBtn.attr("data-course-id");

    function addPage(data){
        var data = {
            num : 100
        }
        var page = new Pager({
          container : $('#video_pager'),
          sum : data.num - 0,
          count : 10,
          step : 10,
          showCount : false,
          start :0,
          onChange : function(num, count){
            drawComment(num + 1)
          }
        });
      page.init();
    };

    addPage();

    function drawComment(num){
        var tpl =
            ['<% comments.forEach(function(val){%>',
                '<article class="comment">',
                    '<div class="left-content">',
                        '<div class="user-head-icon user-head-<%=val.avator||1%>"></div>',
                    '</div>',
                    '<div class="right-content">',
                        '<a href="" class="link user-name"><%=val.nickname%></a>',
                        '<section class="comment-content"><p><%=val.comment%></p></section>',
                        '<% var d = new Date(val.updatetime).toLocaleDateString();%>',
                        '<time class="comment-time"><%=val.updatetime%></time>',
                    '</div>',
                '</article>',
            '<%})%>'].join("");
        $.get('/course/getcomment',{id: courseid},function(result){
            if(result.errno == 0){
                $('#comment_list').html(_.template(tpl ,{comments : result.data}))
            }
        },'json')
    };

    commentBtn.unbind("click").on("click", function (e) {
        var data = {};
        var userId = commentBtn.attr("data-user-id");
        data.comment = commentArea.val();
        data.id = courseid;
        if(data.comment.trim()==''){
            return false;
        }

        $.post('/course/comment', data, 'json').done(function (res) {
            if (res.errno == 0) {
                var tmp = [
                    '<article class="comment">',
                    '<div class="left-content">',
                    '<div class="user-head-icon user-head-', user_avator , '"></div>',
                    '</div>',
                    '<div class="right-content">',
                    '<a href="" class="link user-name">', nickname, '</a>',
                    '<section class="comment-content"><p>', data.comment, '</p></section>',
                    '<time class="comment-time">刚刚</time>',
                    '</div>',
                    '</article>'
                ].join('');
                ALERT('提示','评论成功！');
                $(tmp).prependTo('#comment_list');
                commentArea.val('');
            }
        });


    });


})