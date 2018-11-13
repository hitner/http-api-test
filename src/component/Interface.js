import React, {Component} from 'react';
import './Interface.css';
import * as Utility from './utility';

class ApiInput extends Component {
    render() {
        var inputs = Object.keys(this.props.api_input).map(   
            (ele, index, arr)=> {
                return (<div key={ele}>
                    {ele} <input type="text" value = {this.props.api_input[ele]}
                     onChange={(e)=>this.props.onApiInputChanged(this.props.apiIndex, ele, e.target.value)}/>
                </div>)
            }
        )

        return (<div>
            {inputs}
        </div>)
    }
}

function stateString(status) {
    if(status) {
        switch(status.state) {
            case 1:
            return 'running';
            case 2:
            return 'success';
            case 3:
            return 'failed';
        }
    }
    return '';
}

class ApiDetail extends Component {
    render () {
        const {api} = this.props;
        const {status} = this.props;

        var state_string = stateString(status);
        var describe = status? status.describe : '';


        return (<div className="api-detail">
            <div>{this.props.index}.{api.name}</div>
            <div>PATH:{Utility.pathOnly(api.path)}</div>
            <ApiInput api_input={api.input} 
                onApiInputChanged={this.props.onApiInputChanged} 
                apiIndex={this.props.index}
            />
            <div className='button-flex'>
                <button onClick={(e)=>this.props.onRunApi(this.props.index)}>运行</button>
                <button onClick={(e)=>this.props.onEditApi(this.props.index)}>Edit</button>
            </div>
            <div className={state_string}>{state_string}</div>
            <div>{describe}</div>
        </div>)
    }
}



class Interface extends Component {
    render () {
        var apis = this.props.interface.map((ele, index, arr) => {
            return (<ApiDetail key={ele.name} api={ele} 
                index={index} 
                onApiInputChanged={this.props.onApiInputChanged}
                onRunApi={this.props.onRunApi}
                status={this.props.status[index]}/>
                )
        });

        return (<div className="interface">
            {apis}
        </div>)
    }
}

export default Interface;