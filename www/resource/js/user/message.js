/**
 * Created by wungcq on 15/8/29.
 */
define(function (require, exports, moudle) {
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
          return me;
        }
      };
    })();
    me.get = settings.get;
    me.set = settings.set;
    return this;
  };

  messagePage.prototype = {
    init: function () {
      var me = this;
    },
    getElements: function(){
      var me = this;
    },
    getHashParam: function () {
      var me = this;
      if(window.location.hash == ''){
        me.set('recentViewDialog',null);
      }else{
        var diaLogUserId = parseInt(window.location.hash);
        me.set('recentViewDialog',diaLogUserId);
      }
      return me;
    },

    openDialog: function(){
      var me = this;
      var dialogUserId = me.get('recentViewDialog');
      //dialogUserId
    },
    bind: function(){
      var me = this;
    }

  };

});