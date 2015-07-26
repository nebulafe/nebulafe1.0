define(function (require, exports, moudle) {
    alifenxi.track("course_video_view", {
        "course_name": $('#course_name').html()
    });

    var commentBtn = $("#comment-submit");
    var commentArea = $("#user-comment-editor");

    commentBtn.unbind("click").on("click", function (e) {
        var data = {};
        var userId = commentBtn.attr("data-user-id");
        data.comment = commentArea.val();
        data.id = commentBtn.attr("data-course-id");
        var nickname = commentBtn.attr("data-nickname");
        if(data.comment.trim()==''){

            return false;
        }

        $.post('/course/comment', data, 'json').done(function (res) {
            if (res.errno == 0) {
                var tmp = [
                    '<article class="comment">',
                    '<div class="left-content">',
                    '<div class="user-head-icon user-head-', userId % 20, '"></div>',
                    '</div>',
                    '<div class="right-content">',
                    '<a href="" class="link user-name">', nickname, '</a>',
                    '<section class="comment-content"><p>', data.comment, '</p></section>',
                    '<time class="comment-time">刚刚</time>',
                    '</div>',
                    '</article>'
                ].join('');
                ALERT('提示','评论成功！');
                $(tmp).insertBefore('.comment-list .comment:first-child');
                commentArea.val('');
            }
        });

    });


})