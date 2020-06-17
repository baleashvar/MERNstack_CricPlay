import React, { Component } from 'react';
import api from '../api/index';
import {RenderPlayerInfo, PlayMatch} from '../pages/match';
import { Loading } from '../components/LoadingComponent';
import '../style/match.css';
import 'react-table/react-table.css';



class PlayersList extends Component {

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

        const list = players.map(player => {
            return(
                <div key={player._id} className="col-12 col-md-5 m-1">
                    <RenderPlayerInfo player={player} />
                </div>
                // <p>{player._id}</p>
            );
        });

        return (
            <div>
                {
                    isLoading ? <Loading></Loading> :
                
                    <div className="container">
                        <div className="row justify-content-center text-center" id="selecteleven">
                            <div className="col-12">
                                Click Player to add to Playing XI and
                                Click again to remove from Playing XI
                            </div>
                        </div>
                        <div className="row justify-content-center text-center" id="playbutton">
                            <div className="col-12">
                                <PlayMatch />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {list}
                        </div>
                    </div>
                    
                }
            </div>
        )
    }
}

export default PlayersList