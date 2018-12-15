
import React, {Component} from 'react';
import { Dialog } from '@material-ui/core';

var only_modal = null;

class StandardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:2 ,//0 none, 1 toast, 2 confirm-dialog, 3 dialog
            show:1,
        }
    }

    componentDidMount() {
        only_modal = this;
    }

    render () {
        var componet = null;
        switch(this.state.type) {
            case 1:
            break;
            case 2:
            componet = (<Dialog open={this.state.show}>hellow</Dialog>)
            break;
            case 3:
            break;
            default :
            break;
        }
        return (<div>{componet}</div>)
    }
}

export default StandardModal;

export function SMToast(content, showtime = 2) {

}


export function SMAlert(content, callback) {
    only_modal.setState({
        type:2,
        content:content,
    });
}