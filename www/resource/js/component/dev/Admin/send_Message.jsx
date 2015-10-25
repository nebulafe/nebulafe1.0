
var Selector = require('../Selector/index.jsx');

var SendMessageController = React.createClass({
  getInitialState(){
      return {
        title: this.props.title||null,
        content: this.props.content || null,
        createTime: this.props.createTime || null,
        isPushNow: this.props.isPushNow == undefined ? true : this.props.isPushNow,
        status: false
      }
  },
  render(){
    return (
      <div className={'row message-box card'}>
        <h1>发布消息</h1>
        <div className={'row'}>
          <div className={'col col-left'}>
            <span className="txt">消息标题</span>
          </div>
          <div className={'col col-right'}>
            <input className={'input input-long'} data-role="input" value={this.state.title} onChange={this.changeTitle} placeholder="请输入消息标题"/>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col col-left'}>
            <span className="txt">消息内容</span>
          </div>
          <div className={'col col-right'}>
            <textarea className={'input input-long'}
             style={{height:'200px',resize:'vertical'}}
             data-role={"input"}
             value={this.state.content}
             onChange={this.changeContent}
             placeholder="请输入消息内容,输入链接请使用这种格式 &lt;a href=&quot;链接地址&quot;&gt;链接名称&lt;/a&gt; ,如: &lt;a href=&quot;http://www.google.com.hk/&quot;&gt;谷歌&lt;/a&gt;" ></textarea>
          </div>
        </div>
        {this.renderIfPushNow()}
        <div className={`row ${this.state.isPushNow?'hide':''}`}>
          <div className={'col col-left'}>
            <span className={'txt'}>发布时间</span>
          </div>
          <div className={`col col-right`}>
            <input type="date" className={'input input-short' } data-role="input" value={this.state.pushDate} onChange={this.changePushDate} placeholder="请输入推送日期"/>
          </div>
          <div className={`col col-right`}>
            <input type="time" className={'input input-short'} data-role="input" value={this.state.pushTime} onChange={this.changePushTime} placeholder="请输入推送时间"/>
          </div>

        </div>
        <div className={'row btn-wrapper'}>
          <div className={'col col-right'}>
            <span className="radiusBtn square style_1 auto" onClick={this.pushMessage}>发布消息</span>
          </div>
        </div>



      </div>
    )
  },
  changeTitle(ev){
    this.state.title = ev.target.value;
    this.setState(this.state);
  },
  changeContent(ev){
    this.state.content = ev.target.value;
    this.setState(this.state);
  },
  changePushTime(ev){
    let pushTime = ev.target.value;
    if(this.checkDate(this.state.pushDate,pushTime)){
      this.state.pushTime = pushTime;
      this.setState(this.state);
    }else{
      return false;
    }
  },
  changePushDate(ev){
    let pushDate = ev.target.value;
    if(this.checkDate(pushDate,this.state.pushTime)){
      this.state.pushDate = pushDate;
      this.setState(this.state);
    }else{
      return false;
    }
  },
  renderIfPushNow(){
    var content = this.state.isPushNow ? '设置为指定时间推送':'设置为发布后立即推送';
    var nowStatus = this.state.isPushNow ? '发布后立即推送':'指定时间推送';
    return (
      <div className={'row'}>
        <div className={'col col-right'}>
          <span className="txt">时间设置</span>
        </div>
        <div className={'col col-right'}>
          <span className="radiusBtn square auto style_2" onClick={this.setIsPushNow}>{content}</span>
        </div>
        <div className={'col col-right'}>
          <span className="txt g-secondary-txt">注:选定状态为 : {nowStatus}</span>
        </div>
      </div>
    );
  },
  setIsPushNow(){
      this.state.isPushNow = !this.state.isPushNow;
      this.setState(this.state);

  },
  pushMessage(ev){
    if(this.state.status==false){

      console.log('消息json如下');
      let message = {
        title: this.state.title,
        content: this.state.content,
      }
      var flag = true;
      if(!this.state.title){
        alert('标题不能为空');
        flag = false;
      }
      if(!this.state.content){
        alert('内容不能为空');
        flag = false;
      }
      if(!this.state.isPushNow){
        if(!this.checkDate(this.state.pushDate,this.state.pushTime)){
          flag = false;
        }else{
          this.setPushDateTime();
        }
      }else{
        this.state.pushDateTime = Date.now();
      }

      if(flag){
        this.publishMessage();
      }else{
        return false;
      }

    }else{
      if(Date.now() >= this.state.pushDateTime){
        alert('当前时间已经落后于推送时间,修改无法生效!');
        return false;
      }else{
        this.publishMessage();
      }
    }
  },
  setPushDateTime(isPushStateBanned){
    this.state.pushDateTime = new Date(this.state.pushDate+ ' '+this.state.pushTime);
    if(!isPushStateBanned == true){
      this.setState(this.state);
    }
  },
  checkDate(dateStr,timeStr){
    var d = new Date(dateStr+' '+timeStr);
    if(d<=Date.now()){
      alert('推送时间不得早于当前时间');
      return false;
    }
    else{
       return true;
    }

  },
  parseAnchor(str){
  },
  publishMessage(){
    if(confirm('确认要发布消息吗')){
      console.log(this.state);
      // console.log(this.parseAnchor(this.state.content));
      this.state.status = true;
      this.setState(this.state);
    }
  }
});

var container = document.getElementsByClassName('container')[0];
React.render(<SendMessageController />,container);
