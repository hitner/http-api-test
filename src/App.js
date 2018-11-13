import React, { Component } from 'react';
import GlobalInput from './component/GlobalInput';
import Interface from './component/Interface';
import datasource from './test_data';
import './App.css';
import VConsole from 'vconsole';
import Axios from 'axios';

const  vcon = new VConsole();
vcon.setOption('maxLogNumber', 500);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tc:JSON.parse(datasource),
      origin:"dock",
      status:[],//0 空闲，1正在执行， 2 成功， 3失败 state describe
    };
    this.onGlobalInputChanged = this.onGlobalInputChanged.bind(this);
    this.onApiInputChanged = this.onApiInputChanged.bind(this);
    this.onRunApi = this.onRunApi.bind(this);
    this.onRunAll = this.onRunAll.bind(this);
  }
  componentDidMount() {

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

  wholeUrl(api) {
    var reg = /\$\{.+?\}/g;
    var retArray;
    var path = api.path;
    while((retArray = reg.exec(api.path)) !== null) {
      var target = retArray[0].substring(2, retArray[0].length-1);
      path = path.replace(retArray[0], this.varValue(api, target));
    }
    return this.currentOrigin() + path;
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
    Axios({
      method:api.method,
      url:this.wholeUrl(api),

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
        describe:JSON.stringify(error.response.data),
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



  render() {
    const {tc} = this.state;
    return (
      <div className="App">
       <h1>{tc.name}</h1> 
       <div className="meta-info">
       <div>环境:{this.state.origin}, origin:{this.currentOrigin()}</div>
       <GlobalInput global_input={tc.global_input}
                    onGlobalInputChanged={this.onGlobalInputChanged}
       />
       <button onClick={this.onRunAll}>全部运行</button>
       </div>
       <Interface interface ={tc.interface}
          onApiInputChanged={this.onApiInputChanged}
          onRunApi = {this.onRunApi}
          status ={this.state.status}
       />
      </div>
    );
  }
}

export default App;
