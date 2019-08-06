import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogActions, Button, DialogContent, Input } from '@material-ui/core';
import './EditApiDialog.css';


const default_api = {
    name:'',
    input:'',
    path:'',
    method:'',
    application_json:'',
    headers:'',
    assert:'',
};

function stringifyApi(apiData) {
    var dst = {}
    Object.keys(apiData).forEach((ele) => {
        if (typeof apiData[ele] === "object") {
            dst[ele] = JSON.stringify(apiData[ele])
        }
        else {
            dst[ele] = apiData[ele];
        }
    });
    return dst;
}

class EditApiDialog extends Component {

    constructor(props) {
        super(props);

        var api = default_api;
        if (props.apiData) {
            api = stringifyApi(props.apiData);
        }
        this.state = {
            api:api,
        }
    }




    shouldComponentUpdate(nextProps, nextState) {
        if (!this.props.open && nextProps.open) {
            //重新展示
            this.setState({
                api:nextProps.apiData?stringifyApi(nextProps.apiData):default_api,
            });
        }
        return true;
    }

    onClickSave = ()=> {
        var dist = {}
        Object.assign(dist,this.state.api);
        try {
            dist['input'] = JSON.parse(dist.input);
            } 
        catch (error) {
                dist['input'] = {}
        };
        
       this.props.onSave(dist);
    }

    inputChanged = (ele) => {
        var newApi = this.state.api;
        newApi[ele.target.id] = ele.target.value;
        this.setState ({
            api:newApi,
        });
    }

    render () {
        const {apiData, onClose,onDelete,onSave, ...other} = this.props;
        const {api} = this.state;
        var inputs = [];
        Object.keys(api).forEach(ele => {
            inputs.push((<div key={ele}>
                <div className="input-label">{ele}</div>
                <Input className="input-content" 
                    multiline={true}
                    id= {ele} value={api[ele]} 
                    onChange={this.inputChanged}/>
              </div>))
        }); 

        return (<Dialog {...other}>
            <DialogTitle>预览/修改/删除</DialogTitle>
            <DialogContent>
                {inputs}
            </DialogContent>
            <DialogActions>
                <Button className="delete-btn" variant="outlined" color='secondary' onClick={onDelete}>删除</Button>
                <Button variant="outlined" color="primary" onClick={this.onClickSave} >保存</Button>
                <Button variant="outlined" onClick={onClose}>Cancel </Button>
            </DialogActions>
        </Dialog>)
    }
}


export default EditApiDialog;