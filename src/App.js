import React, { Component } from 'react';
import GlobalInput from './component/GlobalInput';
import Interface from './component/Interface';
import EditApiDialog from './component/EditApiDialog';
import datasource, {main_list} from './test_data';
import './App.css';
import VConsole from 'vconsole';
import Axios from 'axios';
import * as Utility from './component/utility';
import {AppBar, Toolbar, Typography, IconButton, Divider, Button} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import lz from '@lizhife/lz-jssdk';
import SetsList from './component/SetsList';


const  vcon = new VConsole();
vcon.setOption('maxLogNumber', 500);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tc_index:0,//0表示在homepage，其它表示对应tc的index
      sets:JSON.parse(main_list).sets, //
      tc:JSON.parse(datasource),
      origin:"dock",
      status:[],//0 空闲，1正在执行， 2 成功， 3失败 state describe
      apiDialogOpen:false, //修改、添加api对话框
      apiDialogIndex:-1,   //-2,修改头部信息 -1新增api，其它对应要修改的api的序号
    };
    this.onGlobalInputChanged = this.onGlobalInputChanged.bind(this);
    this.onApiInputChanged = this.onApiInputChanged.bind(this);
    this.onRunApi = this.onRunApi.bind(this);
    this.onRunAll = this.onRunAll.bind(this);
    this.onEditApi = this.onEditApi.bind(this);
    this.onAddApi = this.onAddApi.bind(this);
    
    this.loginLizhi();

  }
  componentDidMount() {
    
  }

  updateToken(ret) {
    var {tc} = this.state;
    Object.keys(tc.global_input).forEach(element=>{
      if(tc.global_input[element] === '__TOKEN') {
        tc.global_input[element] = ret;
        this.setState({
          tc:tc,
        });
      }
    });
  }
  //---------------------------login handle -------------------------//
  loginLizhi(){
      lz.config({
        debug:false,
        url:process.env.NODE_EVN === 'development'?'':"//h5security.lizhi.fm/jsBridgeConfig/get",
        apiList:[
          'getToken',
          'getAppInfo',
        ],
        eventList:[
          'verifySignFinish',
          'user:login',
        ]
      });
    
      lz.ready(()=>{
        console.log('lz-jssdk ready now');
        lz.getToken({needRefresh:false}
          ).then((ret)=>{
            console.log('lz jssdk:token:', ret);
            if (ret.status === 'success'){
              this.updateToken(ret.token);
            }
          });
      });
    
  }

  //---------------------------support function -----------------------//
  currentOrigin() {
    return this.state.tc.origin[this.state.origin];
  }

  apiFromIndex(index) {
    const {tc} = this.state;
    return tc.interface[index];
  }

  varValue(api, token) {
    if (api.input.hasOwnProperty(token)) {
      return api.input[token];
    }
    else {
      var res = this.state.tc.global_input[token];
      if(res === undefined) {
        res = '';
      }
      return res;
    }
  }

  replaceVarInString(api, str) {
    var reg = /\$\{.+?\}/g;
    var retArray;
    var result = str;
    while((retArray = reg.exec(str)) !== null) {
      var target = retArray[0].substring(2, retArray[0].length-1);
      result = result.replace(retArray[0], this.varValue(api, target));
    } 
    return result
  }

  wholeUrl(api) {
    return this.currentOrigin() + this.replaceVarInString(api, api.path);
  }

  finalApplicationJson(api) {
    var result = {}
    Object.keys(api.application_json).forEach((key)=>{
      result[key] = this.replaceVarInString(api, api.application_json[key])
    });
    return result;
  }


  requestApi(api, index) {
    var {status} = this.state;
    status[index] = {
      state:1,
      describe:'',
    }
    this.setState({
      status:status,
    });

    var final_app_json = this.finalApplicationJson(api);
    Axios({
      method:api.method,
      url:this.wholeUrl(api),
      data:Utility.isEmptyObject(final_app_json)? null : final_app_json,
    }).then((response)=>{
      var RET = response.data;
      var selfAssert = eval(api.assert);
      console.log(`api index ${index} ,assert result:${selfAssert}`);
      var newStatus = this.state.status;
      newStatus[index] = {
        state:selfAssert?2:3,
        describe:JSON.stringify(RET),
      };
      this.setState({
        status:newStatus,
      });
    }).catch((error)=>{
      console.log(error);
      var newStatus = this.state.status;
      var errorDict = error;
      if (error.response) {
        errorDict = error.response;
        if(error.response.data) {
          errorDict = error.response.data;
        }
      }
      newStatus[index] = {
        state:3,
        describe:JSON.stringify(errorDict),
      };
      this.setState({
        status:newStatus,
      });
    }
    );
  }

  //----------------------------event response -----------------------//
  onRunAll(){
    const {tc} = this.state;
    tc.interface.forEach(
      (element, index) => {
      this.requestApi(element, index);
    });
  }

  onGlobalInputChanged(key,value) {
    const {tc} = this.state;
    tc.global_input[key] = value;
    this.setState({
      tc:tc,
    });
  }

  onApiInputChanged(index,key, value) {
    const {tc} = this.state;
    tc.interface[index].input[key] = value;
    this.setState({
      tc:tc,
    }); 
  }

  onRunApi(index) {
    console.log(`run api index:${index}`);
    var api = this.apiFromIndex(index);
    this.requestApi(api,index);
  }

  onAddApi(){
    this.setState({
      apiDialogOpen:true,
      apiDialogIndex:-1,
    })
  }
  onEditApi(index) {
    this.setState({
      apiDialogOpen:true,
      apiDialogIndex:index,
    })
  }

  onModifyHead = () => {
    this.setState({
      apiDialogIndex:-2,
      apiDialogOpen:true,
    })
  }
  handleApiDialogClose = () => {
    this.setState({
      apiDialogOpen:false,
    })
  }

  add_new_set = (name) => {

  }

  goto_set = (index)=> {
    this.setState({
      tc_index:index,
    })
  }

  goto_homepage =()=> {
    this.setState({
      tc_index:0,
    })
  }
  //----------显示相关-------------
  stat_status(list) {
    var ret ={
      totoal:0,
      running:0,
      success:0,
      failed:0
    };

    ret.totoal = this.state.tc.interface.length;
    list.forEach((element)=>{
      if(element.state === 1) {
        ret.running ++;
      }
      else if(element.state === 2){
        ret.success ++;
      }
      else if(element.state === 3) {
        ret.failed ++;
      }
    });
    return ret;
  }


  render() {
    const {tc} = this.state;
    var statictis = this.stat_status(this.state.status);

    var dialogApi;
    if (this.state.apiDialogOpen){ 
      if (this.state.apiDialogIndex >= 0) {
        dialogApi = tc.interface[this.state.apiDialogIndex];
      }
      else if (this.state.apiDialogIndex == -2) {
        dialogApi = {
          name:tc.name,
          origin:tc.origin,
          global_input:tc.global_input,
        }
      }
    }
    
    return (
      <div className="App">
        <AppBar position="static" color="default">
        <Toolbar>
          <IconButton  color="inherit" aria-label="Home" onClick={this.goto_homepage}>
            <HomeIcon />
          </IconButton>
          {this.state.tc_index > 0 && <Typography variant="h6" color="inherit">
            {tc.name}
            </Typography>
          }
        </Toolbar>
        </AppBar>
        <Divider/>
        {this.state.tc_index>0?<div>
          <div className="meta-info">
          <div>环境:{this.state.origin}, origin:{this.currentOrigin()}</div>
          <GlobalInput global_input={tc.global_input}
                      onGlobalInputChanged={this.onGlobalInputChanged}
          />
          <div className="button-flex">
            <button onClick={this.onRunAll}>全部运行</button>
            <button onClick={this.onModifyHead}>Edit</button>
          </div>
          
          <div>总共:{statictis.totoal},其中
          <span className="running">{statictis.running} running</span>,
          <span className="success">{statictis.success} success</span>,
          <span className="failed">{statictis.failed} failed</span></div>
          </div>
          <Interface interface ={tc.interface}
            onApiInputChanged={this.onApiInputChanged}
            onRunApi = {this.onRunApi}
            onEditApi = {this.onEditApi}
            status ={this.state.status}
          />
          <button onClick={this.onAddApi}>添加接口</button>
          <EditApiDialog open = {this.state.apiDialogOpen}
          apiData = {dialogApi}
          onClose={this.handleApiDialogClose}
          />
        </div> :
          <SetsList sets={this.state.sets} 
                    goto_set = {this.goto_set}
                    add_new_set = {this.add_new_set}
          />

        }
      
      </div>
    );
  }
}

export default App;
