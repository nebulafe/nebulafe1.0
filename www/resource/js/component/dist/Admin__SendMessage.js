/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Selector = __webpack_require__(2);

	var SendMessageController = React.createClass({ displayName: "SendMessageController",
	  getInitialState: function getInitialState() {
	    return {
	      title: this.props.title || null,
	      content: this.props.content || null,
	      createTime: this.props.createTime || null,
	      isPushNow: this.props.isPushNow == undefined ? true : this.props.isPushNow,
	      status: false
	    };
	  },
	  render: function render() {
	    return React.createElement("div", { className: 'row message-box card' }, React.createElement("h1", null, "发布消息"), React.createElement("div", { className: 'row' }, React.createElement("div", { className: 'col col-left' }, React.createElement("span", { className: "txt" }, "消息标题")), React.createElement("div", { className: 'col col-right' }, React.createElement("input", { className: 'input input-long', "data-role": "input", value: this.state.title, onChange: this.changeTitle, placeholder: "请输入消息标题" }))), React.createElement("div", { className: 'row' }, React.createElement("div", { className: 'col col-left' }, React.createElement("span", { className: "txt" }, "消息内容")), React.createElement("div", { className: 'col col-right' }, React.createElement("textarea", { className: 'input input-long',
	      style: { height: '200px', resize: 'vertical' },
	      "data-role": "input",
	      value: this.state.content,
	      onChange: this.changeContent,
	      placeholder: "请输入消息内容,输入链接请使用这种格式 <a href=\"链接地址\">链接名称</a> ,如: <a href=\"http://www.google.com.hk/\">谷歌</a>" }))), this.renderIfPushNow(), React.createElement("div", { className: "row " + (this.state.isPushNow ? 'hide' : '') }, React.createElement("div", { className: 'col col-left' }, React.createElement("span", { className: 'txt' }, "发布时间")), React.createElement("div", { className: "col col-right" }, React.createElement("input", { type: "date", className: 'input input-short', "data-role": "input", value: this.state.pushDate, onChange: this.changePushDate, placeholder: "请输入推送日期" })), React.createElement("div", { className: "col col-right" }, React.createElement("input", { type: "time", className: 'input input-short', "data-role": "input", value: this.state.pushTime, onChange: this.changePushTime, placeholder: "请输入推送时间" }))), React.createElement("div", { className: 'row btn-wrapper' }, React.createElement("div", { className: 'col col-right' }, React.createElement("span", { className: "radiusBtn square style_1 auto", onClick: this.pushMessage }, "发布消息"))));
	  },
	  changeTitle: function changeTitle(ev) {
	    this.state.title = ev.target.value;
	    this.setState(this.state);
	  },
	  changeContent: function changeContent(ev) {
	    this.state.content = ev.target.value;
	    this.setState(this.state);
	  },
	  changePushTime: function changePushTime(ev) {
	    var pushTime = ev.target.value;
	    if (this.checkDate(this.state.pushDate, pushTime)) {
	      this.state.pushTime = pushTime;
	      this.setState(this.state);
	    } else {
	      return false;
	    }
	  },
	  changePushDate: function changePushDate(ev) {
	    var pushDate = ev.target.value;
	    if (this.checkDate(pushDate, this.state.pushTime)) {
	      this.state.pushDate = pushDate;
	      this.setState(this.state);
	    } else {
	      return false;
	    }
	  },
	  renderIfPushNow: function renderIfPushNow() {
	    var content = this.state.isPushNow ? '设置为指定时间推送' : '设置为发布后立即推送';
	    var nowStatus = this.state.isPushNow ? '发布后立即推送' : '指定时间推送';
	    return React.createElement("div", { className: 'row' }, React.createElement("div", { className: 'col col-right' }, React.createElement("span", { className: "txt" }, "时间设置")), React.createElement("div", { className: 'col col-right' }, React.createElement("span", { className: "radiusBtn square auto style_2", onClick: this.setIsPushNow }, content)), React.createElement("div", { className: 'col col-right' }, React.createElement("span", { className: "txt g-secondary-txt" }, "注:选定状态为 : ", nowStatus)));
	  },
	  setIsPushNow: function setIsPushNow() {
	    this.state.isPushNow = !this.state.isPushNow;
	    this.setState(this.state);
	  },
	  pushMessage: function pushMessage(ev) {
	    if (this.state.status == false) {

	      console.log('消息json如下');
	      var message = {
	        title: this.state.title,
	        content: this.state.content
	      };
	      var flag = true;
	      if (!this.state.title) {
	        alert('标题不能为空');
	        flag = false;
	      }
	      if (!this.state.content) {
	        alert('内容不能为空');
	        flag = false;
	      }
	      if (!this.state.isPushNow) {
	        if (!this.checkDate(this.state.pushDate, this.state.pushTime)) {
	          flag = false;
	        } else {
	          this.setPushDateTime();
	        }
	      } else {
	        this.state.pushDateTime = Date.now();
	      }

	      if (flag) {
	        this.publishMessage();
	      } else {
	        return false;
	      }
	    } else {
	      if (Date.now() >= this.state.pushDateTime) {
	        alert('当前时间已经落后于推送时间,修改无法生效!');
	        return false;
	      } else {
	        this.publishMessage();
	      }
	    }
	  },
	  setPushDateTime: function setPushDateTime(isPushStateBanned) {
	    this.state.pushDateTime = new Date(this.state.pushDate + ' ' + this.state.pushTime);
	    if (!isPushStateBanned == true) {
	      this.setState(this.state);
	    }
	  },
	  checkDate: function checkDate(dateStr, timeStr) {
	    var d = new Date(dateStr + ' ' + timeStr);
	    if (d <= Date.now()) {
	      alert('推送时间不得早于当前时间');
	      return false;
	    } else {
	      return true;
	    }
	  },
	  parseAnchor: function parseAnchor(str) {},
	  publishMessage: function publishMessage() {
	    if (confirm('确认要发布消息吗')) {
	      console.log(this.state);
	      // console.log(this.parseAnchor(this.state.content));
	      this.state.status = true;
	      this.setState(this.state);
	    }
	  }
	});

	var container = document.getElementsByClassName('container')[0];
	React.render(React.createElement(SendMessageController, null), container);

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by wungcq on 15/9/23.
	 */

	//let React = require('React');

	"use strict";

	var SelectorListItem = React.createClass({ displayName: "SelectorListItem",
	  getInitialState: function getInitialState() {
	    return { selected: this.props.selected };
	  },
	  onSelect: function onSelect(val, index, label) {
	    this.props.onSelect(val, index, label);
	  },

	  select: function select() {
	    this.state.selected = !this.state.selected;
	    this.onSelect(this.props.value, this.props.index, this.props.label);
	  },

	  render: function render() {
	    return React.createElement("li", {
	      className: this.props.selected ? 's-cur' : '',
	      onClick: this.select }, React.createElement("div", { className: "text" }, this.props.label));
	  }
	});

	var Selector = React.createClass({ displayName: "Selector",

	  setValue: function setValue(value, index, label) {
	    var OldValue = this.state.value;
	    this.state.value = value;
	    var OldIndex = this.state.index;
	    this.state.index = index;
	    this.state.label = label;
	    //脏检查判断新旧值，发生改变则调用onChange
	    if (OldIndex != index) {
	      this.onChange(value, index, label, OldValue, OldIndex);
	    }
	    if (this.state.isOpen) {
	      this.setOpen(false);
	    }
	  },
	  onChange: function onChange(value, index, label, OldValue, OldIndex) {
	    if (typeof this.props.onChange == 'function') {
	      this.props.onChange.apply(null, arguments);
	    }
	    return;
	  },
	  onSelect: function onSelect(value, index, label) {
	    if (typeof this.props.onSelect == 'function') {
	      this.props.onSelect.apply(null, arguments);
	    }
	    return;
	  },
	  setOpen: function setOpen(isOpen) {
	    var newState = this.state;
	    newState.isOpen = isOpen;
	    this.setState(newState);
	  },
	  getInitialState: function getInitialState() {
	    return {
	      isOpen: false,
	      index: this.props.index,
	      value: this.props.value,
	      label: this.props.label
	    };
	  },

	  toggleDropMenu: function toggleDropMenu(e) {
	    var isOpen = !this.state.isOpen;
	    this.setOpen(isOpen);
	  },

	  getScrollHeight: function getScrollHeight() {
	    var liHeight = 34;
	    var scrollNum = this.props.scrollNum;
	    if (!scrollNum) {
	      return '280px'; //默认值
	    } else {
	        return scrollNum * liHeight + 8 + "px";
	      }
	  },

	  getHtml: function getHtml() {
	    var _this = this;

	    return this.props.options.map(function (option, index) {
	      return React.createElement(SelectorListItem, {
	        value: option.value,
	        label: option.label,
	        index: index,
	        selected: _this.state.index == index,
	        onSelect: _this.setValue });
	    });
	  },
	  getSelectorClass: function getSelectorClass() {
	    return "widget-selector  " + this.props.theme + " " + (this.props.direction || 'down') + " " + (this.state.isOpen ? 'show' : '') + " }";
	  },

	  getSelectorScrollViewStyle: function getSelectorScrollViewStyle() {
	    return {
	      width: "auto",
	      maxHeight: this.getScrollHeight(),
	      overflowY: "scroll"
	    };
	  },

	  render: function render() {
	    return React.createElement("span", { className: this.getSelectorClass(), style: { width: 'auto' }, onblur: this.toggleDropMenu }, React.createElement("em", { className: "w-show-sel", onClick: this.toggleDropMenu }, this.state.label || this.props.label || '请点击此处展开下拉列表选择'), React.createElement("span", { className: "w-arr" }), React.createElement("ul", { className: "w-lists" }, React.createElement("div", { className: "scroll-view", style: this.getSelectorScrollViewStyle() }, this.getHtml())));
	  }
	});

	module.exports = Selector;

/***/ }
/******/ ]);