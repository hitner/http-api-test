import React ,{Component} from 'react';
import {SMConfirmDialog} from './StandardModal';

import './SetsList.css';
import { List, ListItem, ListItemText ,ListItemSecondaryAction, IconButton, Button, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class SetsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openDialog:false,
            setName:''
        }
    }
    open_dialog = () =>{
        this.setState({
            openDialog:true,
        })
    }

    close_dialog = ()=> {
        this.setState({
            openDialog:false,
        })
    }

    input_name_changed = (ent)=> {
        this.setState({
            setName:ent.target.value,
        })
    }
    confirm_dialog = (event)=> {
        const namee = this.state.setName.trim();
        if (namee) {
            this.setState({
                openDialog:false,
                setName:'',
            })
            this.props.add_new_set(namee);
        }
    }

    on_click_delete_button = (index)=> {
        SMConfirmDialog(`确定删除测试集"${index}"吗？`,()=>{
            this.props.delete_set(index);
        });
    }

    render() {
        const list_data = this.props.sets.map((ele)=> {
            return (<ListItem key={ele.index} button={true} onClick={()=>this.props.goto_set(ele.index)}>
                <ListItemText inset={true} primary={ele.index}></ListItemText>
                <ListItemText inset={true} primary={ele.name}></ListItemText>
                <ListItemText inset={true} primary={ele.size}></ListItemText>
                <ListItemText inset={true} primary={ele.mtime}></ListItemText>
                <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={()=>{this.on_click_delete_button(ele.index);}}>
                        <DeleteIcon />
                      </IconButton>
                </ListItemSecondaryAction>
            </ListItem>)
        })
        return (<div>
            <List>
                {list_data}
            </List>
            <Button onClick={this.open_dialog}>
                新增</Button>
          <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">测试集名称</DialogTitle>
          <DialogContent>
            
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="test set name"
              type="text"
              onChange={this.input_name_changed}
              required={true} 
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.confirm_dialog} color="primary">
              确认
            </Button>
            <Button onClick={this.close_dialog} color="primary">
              取消
            </Button>
          </DialogActions>
            </Dialog>
        </div>)
    }
}

export default SetsList;


