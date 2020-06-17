import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Loading } from '../components/LoadingComponent';
import api from '../api/index';
import '../style/pages.css';
import 'react-table/react-table.css';


class UpdatePlayer extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/players/update/${this.props.id}`
    }
    render() {
        return(
            <div id="update" onClick={this.updateUser}>Update</div>
        );
    }
}

class DeletePlayer extends Component {
    deleteUser = event => {
        event.preventDefault()

        if(
            window.confirm(`Do you want to delete the player ${this.props.id} permanently?`)
        ) {
            api.deletePlayerById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return(
            <div id="delete" onClick={this.deleteUser}>Delete</div>
        );
    }
}


class PlayersTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            players: [],
            columns: [],
            isLoading: false
        }
    }

    componentDidMount = async() => {
        this.setState({ isLoading: true })

        await api.getAllPlayers()
            .then(players => {
                this.setState({
                    players: players.data.data,
                    isLoading: false
                })
            })
    }


    render() {

        const {players, isLoading} = this.state

        // console.log('TCL: PlayersList -> render -> players', players)

        var notUpdatable = ['5ee997d704d2c5151b61cce7', '5ee9982e04d2c5151b61cce8', '5ee9985104d2c5151b61cce9',
            '5ee9999604d2c5151b61ccea', '5ee999e304d2c5151b61cceb', '5ee99a2804d2c5151b61ccec',
            '5ee99a7d04d2c5151b61cced', '5ee99acb04d2c5151b61ccee', '5ee99b2804d2c5151b61ccef',
            '5ee99b6b04d2c5151b61ccf0', '5ee99bc604d2c5151b61ccf1']

        const columns = [
            // {
            //     Header: 'ID',
            //     accessor: '_id',
            //     filterable: true
            // },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true
            },
            {
                Header: 'Age',
                accessor: 'age',
                filterable: true
            },
            {
                Header: 'Batting Skills',
                accessor: 'batting',
                filterable: true
            },
            {
                Header: 'Bowling Skills',
                accessor: 'bowling',
                filterable: true
            },
            {
                Header: 'Fielding Skills',
                accessor: 'fielding',
                filterable: true
            },
            {
                id: 'wk',
                Header: 'Wicket-Keeper?',
                accessor: d => d.wk === true ? "Yes" : "No",
                filterable: true,
            },
            {
                Header: 'Highest Score',
                accessor: 'highestscore',
                filterable: true
            },
            {
                Header: 'Best Bowling Figure',
                accessor: 'bestbowlfig',
                filterable: true
            },
            // { 
            //     id: 'createdAt',
            //     Header: 'Created At',   
            //     accessor: d => d.createdAt.toString(),
            //     filterable: true
            // },
            // { 
            //     id: 'updatedAt',
            //     Header: 'Updated At',   
            //     accessor: d => d.updatedAt.toString(),
            //     filterable: true
            // },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return(
                        <span>
                            {
                                notUpdatable.includes(props.original._id) ? `Default Player` : <DeletePlayer id={props.original._id} />
                            }
                        </span>
                    );
                }
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return(
                        <span>
                            {
                                notUpdatable.includes(props.original._id) ? `Can't Update/Delete` : <UpdatePlayer id={props.original._id} />
                            }
                        </span>
                    );
                }
            }
        ]

        let showTable = true
        if(!players.length) {
            showTable = false
        }

        return (
            <>
                {
                    isLoading ? <Loading></Loading> :
                    
                    <div className="container">
                        <div className="row justify-content-center mb-4">
                            <div className="col-12">
                                {showTable && (
                                    <ReactTable
                                        data={players}
                                        columns={columns}
                                        loading={isLoading}
                                        defaultPageSize={10}
                                        showPageSizeOptions={true}
                                        minRows={0}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default PlayersTable