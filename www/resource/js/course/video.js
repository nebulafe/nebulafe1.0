define(function (require, exports, moudle) {
    alifenxi.track("course_video_view", {
        "course_name": $('#course_name').html()
    });

    var commentBtn = $("#comment-submit");
    var commentArea = $("#user-comment-editor");
    var user_avator = ($('#ne_user_avator').val() - 0) || 1;
    var nickname = $('#ne_user_nickname').val() || $('#ne_user_name').val();
    var userId = $('#ne_user_id').val() ;

    commentBtn.unbind("click").on("click", function (e) {
        var data = {};

        data.comment = commentArea.val();
        data.id = commentBtn.attr("data-course-id");
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