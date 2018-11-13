import React, {Component} from 'react';
import './GlobalInput.css';

class GlobalInput extends Component {
    render() {
        var inputs = Object.keys(this.props.global_input).map(   
            (ele, index, arr)=> {
                return (<div key={ele}>
                    {ele} <input type="text" value = {this.props.global_input[ele]}
                     onChange={(e)=>this.props.onGlobalInputChanged(ele, e.target.value)}/>
                </div>)
            }
        )

        return (<div>
            {inputs}
        </div>)
    }
}

export default GlobalInput;