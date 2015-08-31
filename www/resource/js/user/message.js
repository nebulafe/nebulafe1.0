/**
 * Created by wungcq on 15/8/29.
 */
define(function (require, exports, moudle) {
  var helper = {};
  helper.getTemplate = function (Selecotr) {
    return $(Selecotr).html().replace(/<`%/g, '<%').replace(/%`>/g, '%>')
  }

  var messagePage = function () {
    var me = this;
    var settings = (function () {
      var s = {
        'userId': null,
        '': null,
        'recentViewDialog': null
      };
      var fn = {
        get: function (name) {
          return s[name];
        },
        set: function (name, val) {
          s[name] = val;
          return val;
        }
      };
      return fn;
    })();
    me.get = settings.get;
    me.set = settings.set;
    return this;
  };

  messagePage.prototype = {
    init: function () {
      var me = this;
      me.getElements().bind().getHashParam().openDialog();
    },
    getElements: function () {
      var me = this;
      me.sendBtn = $('#msg_submit');
      me.dialogLeft = $('#middle_users_view');
      me.dialogView = $('#msg_detail_view');
      me.msgEditor = $('#msg_editor');
      return me;
    },
    getHashParam: function () {
      var me = this;
      if (window.location.hash == '') {
        me.set('recentViewDialog', null);
      } else {
        var diaLogUserId = parseInt(window.location.hash.substring(1));
        me.set('recentViewDialog', diaLogUserId);
      }
      return me;
    },
    getDialogMessages: function () {
      var me = this;
      return function (cb) {
        $.post(
          '/user/getMsgWihtId/',
          {'otherid': me.get('recentViewDialog')},
          'json'
        ).done(function (res) {
            cb && cb(res);
          })
      }
    },
    openDialog: function () {
      var me = this;
      var dialogUserId = me.get('recentViewDialog');
      me.getDialogMessages()(function (res) {
        console.log(res);
        if (res.errno == 0) {
          me.renderRightMessage(res);
          me.bindCheckReadMessage();
        }
      })
      //dialogUserId
    },
    fillDialog: function () {

    },
    bind: function () {
      var me = this;
      me.dialogLeft.on('click', function (e) {
        var target = $(e.target);
        if (target.hasClass('user-abs')) {
          if (me.get('recentViewDialog') != target.attr('data-from-id')) {
            me.set('recentViewDialog', target.attr('data-from-id'));
            me.openDialog();
          }
        } else if (target.hasClass('left-content') || target.hasClass('right-content')) {
          target.parent().trigger('click');
        } else if (target.hasClass('user-head') || target.hasClass('txt')) {
          target.parent().parent().trigger('click');
        }
      });

      me.sendBtn.click(function(){
        me.sendMessage();
      });
      return me;
    },
    renderRightMessage: function (data) {
      var me = this;
      me.get('rightTemplate') || me.set('rightTemplate', helper.getTemplate('#template_right'));
      var rightRender = me.get('rightRender') || me.set('rightRender', _.template(me.get('rightTemplate')));
      var html = rightRender(data);
      me.dialogView.html(html);
      return me;
    },
    sendMessage: function () {
      var me = this;
      var content = me.msgEditor.val();
      var user_id = me.sendBtn.attr('data-user-id');
      var avator = me.sendBtn.attr('data-avator');
      var nickname = me.sendBtn.attr('data-nickname');
      var update_time = new Date();

      var renderData = {
        data: [
          {
            'content' : content,
            'fromavator' : avator,
            'fromnickname': nickname,
            'update_time': update_time,
            'action' : 'send',
            'title' : '发送消息',
            'isread' : true
          }
        ]
      };

      $.ajax({
        url: '/user/sendMsg',
        type: 'POST',
        data: {
          toid : me.get('recentViewDialog'),
          title: '',
          content: content
        },
        dataType: 'json'
      }).done(function(res){
        if(res.errno == 0){
          me.renderRightMessage(renderData);
        }else{
          ALERT('发送失败',res.msg);
        }

      });

    },
    bindCheckReadMessage: function () {
      var me = this;
      var scrollHeight = me.dialogView.height();
      console.log(scrollHeight);
      me.dialogView.on('scroll', function (e) {
        var top = me.dialogView.scrollTop();
        me.checkUnread(top, scrollHeight);
      });
    },
    checkUnread: function(top, scrollHeight) {
      var me = this;
      $('.message.msg-receive.isread-0', me.dialogView).each(function () {
        if ((top < this.offsetTop) && (this.offsetTop < top + scrollHeight - 200)) {
          me.setMsgRead(this);
        }
      });

    },
    setMsgRead: function (elem) {
      console.log(elem.scrollTop);
      var data = {messageid: elem.getAttribute('data-msg-id')};
      $(elem).removeClass('isread-0');
      $.post('/user/readMsg',data,'json').done(function(){
        console.log('已经将内容为' + elem +'的消息置为已读');
      });
    },



  };

  var entity = new messagePage();
  entity.init();
  moudle.exports = entity;

});
