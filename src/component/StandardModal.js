
import React, {Component} from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions,Button } from '@material-ui/core';

var only_modal = null;




class StandardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'' ,// [none], K-toast,  K-confirm-dialog,  K-dialog
            show:false,
            content:'',
            confirmCallback:null,
        }
    }

    componentDidMount() {
        only_modal = this;
    }

    onClickCancelButton = ()=> {
        this.setState({
            type:'',
            show:false,
        })
    }

    onClickConfirmButton = ()=> {
        this.setState({
            type:'',
            show:false, 
        });
        if (this.state.confirmCallback) {
            this.state.confirmCallback();
        }
    }
    render () {
        var componet = null;
        switch(this.state.type) {
            case 'K-toast':
            break;
            case 'K-confirm-dialog':
            componet = (<Dialog open={this.state.show}><DialogContent>
                    <DialogContentText>{this.state.content}</DialogContentText>
                    <DialogActions>
            <Button onClick={this.onClickConfirmButton} color="primary">
              确认
            </Button>
            <Button onClick={this.onClickCancelButton} color="primary">
              取消
            </Button>
          </DialogActions>
                </DialogContent></Dialog>)
            break;
            case 'K-dialog':
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


export function SMConfirmDialog(content, callback) {
    only_modal.setState({
        show:true,
        type:'K-confirm-dialog',
        content:content,
        confirmCallback:callback,
    });
}