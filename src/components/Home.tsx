import { Button, Card, CardActionArea, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { itemType } from '../interface';
import './createtodo.css';
import './cardbox.css';
import './home.css';

interface props {

}

interface state {
    getTitle: string,
    getDesc: string | number,
    getStatus: string,
    myNewInputData: itemType,
    items: itemType[],
    editItem: itemType,
    editForm: boolean,
    editId: string,
    checkStatus: boolean
}

class Home extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            getTitle: "",
            getDesc: "",
            getStatus: "",
            myNewInputData: {},
            items: [],
            editItem: {},
            editForm: false,
            editId: "",
            checkStatus: false,
        }
    }

    addTodo() {
        if (this.state.getTitle && this.state.getDesc && this.state.getStatus) {
            console.log("Data Value");
            this.setState({
                myNewInputData: {
                    id: new Date().getTime().toString(),
                    title: this.state.getTitle,
                    desc: this.state.getDesc,
                    status: this.state.getStatus
                }
            })
        }
        this.setState({ getTitle: "" });
        this.setState({ getDesc: "" });
        this.setState({ getStatus: "" });
    }

    componentDidMount() {
        if (localStorage.getItem("data")) {
            this.setState({ items: JSON.parse(localStorage.getItem("data") || "") });
        }
    }

    componentDidUpdate(prevProps: props, prevState: state) {
        if (prevState.myNewInputData !== this.state.myNewInputData) {
            this.setState({ items: [...this.state.items, this.state.myNewInputData] })
        }
        if (prevState.items !== this.state.items) {
            localStorage.setItem("data", JSON.stringify(this.state.items));
        }
        if (prevState.editItem !== this.state.editItem) {
            this.setState({ getTitle: this.state.editItem.title || "" });
            this.setState({ getDesc: this.state.editItem.desc || "" });
            this.setState({ getStatus: this.state.editItem.status || "" });
            this.setState({ editId: this.state.editItem.id || "" });
            if (this.state.editItem.status === "Complete") {
                this.setState({ checkStatus: true });
            }
        }
    }

    editItem(id: string) {
        this.setState({ editForm: true });
        this.state.items.find((elem) => {
            return elem.id === id ? this.setState({ editItem: elem }) : ""
        })
    }

    deleteItem(id: string) {
        this.setState({
            items: this.state.items.filter((elem) => {
                return elem.id !== id
            })
        })
    }

    updateTodo() {
        this.setState({
            items: this.state.items.map((elem) => {
                if (elem.id === this.state.editId) {
                    return { ...elem, id: this.state.editId, title: this.state.getTitle, desc: this.state.getDesc, status: this.state.getStatus };
                } else {
                    return elem;
                }
            })
        })
        this.setState({ getTitle: "" });
        this.setState({ getDesc: "" });
        this.setState({ getStatus: "" });
        this.setState({ editId: "" });
        this.setState({ editItem: {} });
        this.setState({ editForm: false });
        this.setState({ checkStatus: false });
    }

    render() {
        return (
            <>
                <Grid container data-testid="home-1">
                    <Grid item xs={8} className="grid1">
                        <div className="cTodoBox">
                            <Typography variant='h6' className="text" data-testid="heading">
                                {
                                    this.state.editForm ? "Edit Todo" : "Create Todo"
                                }
                            </Typography>
                            <form className="form" autoComplete='off'>
                                <div className="titleBox">
                                    <TextField id="standard-basic" name="title" className="title" label="title" value={this.state.getTitle} onChange={(e) => this.setState({ getTitle: e.target.value.replace(/[^a-zA-Z]/ig, '') })} />
                                </div>
                                <div className="multilineBox">
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Desc"
                                        name="desc"
                                        className="multiline"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        value={this.state.getDesc}
                                        onChange={(e) => this.setState({ getDesc: e.target.value })}
                                    />
                                </div>
                                <div className="formControlBox">
                                    <FormControl className="formControl">
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="status"
                                            disabled = {this.state.checkStatus}
                                            value={this.state.getStatus}
                                            onChange={(e: any) => this.setState({ getStatus: e.target.value })}
                                        >
                                            <MenuItem value="Todo">Todo</MenuItem>
                                            <MenuItem value="InProgress">InProgress</MenuItem>
                                            <MenuItem value="Complete">Complete</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="button">
                                    <Button variant="contained" color="primary" onClick={this.state.editForm ? () => this.updateTodo() : () => this.addTodo()} data-testid="button" className='btn'>
                                        {
                                            this.state.editForm ? "Update Todo" : "Add Todo"
                                        }
                                    </Button>
                                </div>
                            </form>
                        </div>

                    </Grid>
                    <Grid item xs={4} className="grid2">
                        <div>
                            {
                                this.state.items.map((elem, i) => {
                                    {
                                        return (<><Card className="card" key={elem.id}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography gutterBottom variant='h5' color="textSecondary" component="h2">{elem.title}</Typography>
                                                    <div className="desc">
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {elem.desc}
                                                        </Typography>
                                                    </div>
                                                    <Typography variant="body2" color="textSecondary" className="status" component="p">
                                                        Status: <span> {elem.status}</span>
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={() => this.editItem(elem.id || "")}>
                                                    Edit
                                                </Button>
                                                <Button size="small" color="secondary" onClick={() => this.deleteItem(elem.id || "")}>
                                                    Delete
                                                </Button>
                                            </CardActions>
                                        </Card>
                                        </>)
                                    }
                                })
                            }
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default Home;

