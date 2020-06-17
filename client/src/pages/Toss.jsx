import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import ReactCardFlip from 'react-card-flip';
import { list } from './match';
import '../style/toss.css';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export var i = 0;       //tosswinorlose
// export const List = list

const StyledTableCell = withStyles((theme) => ({
head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
},
body: {
    fontSize: 14,
},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
root: {
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
},
}))(TableRow);


class Toss extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playingXI: list,
            isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }


    handleClick(e) {
        var flipResult = Math.round(Math.random());
        
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        if(flipResult === 0) {
            i=1;
        }
        else {
            i=2;
        }
    }

    cointoss = () => {
        var flipResult = Math.random();
        setTimeout(() => {
            if(flipResult <= 0.5) {
                this.toggle()
            }
            else {
                this.toggle()
            }
        }, 100);

    }

    toggle(){
        this.setState({active: !this.state.active});
     }


    render() {
        const classes = makeStyles({
            table: {
              minWidth: 700,
            },
          });


          const LetsPlay= () => {
            const [redirect, setRedirect] = React.useState(false);
        
            const renderRedirect = () => {
                if(redirect) {
                    return <Redirect to='/toss/results' />
                }
            }
            const gotoResults = () => {
                if( i===0 ) {
                    alert('Have Toss first.');
                }
                else {
                    // alert('Playing XI is: '+JSON.stringify(list));
                    setRedirect(!redirect)
                    // window.location.replace('/toss');     
                }
            }
            const gotoResultsBatFirst = () => {
                if( i===0 ) {
                    alert('Have Toss first.');
                }
                else {
                    // alert('Playing XI is: '+JSON.stringify(list));
                    i=3;
                    setRedirect(!redirect)
                    // window.location.replace('/toss');     
                }
            }

            const abc = () => {
                if(i===1) {
                    return(
                        <div className="container">
                            <div className="row justify-content-center text-center">
                                <div className="col-12" id="tossbuttons">
                                <Button variant="secondary" onClick={gotoResultsBatFirst} >
                                    Batting
                                </Button>
                                <Button variant="secondary" onClick={gotoResults} >
                                    Bowling
                                </Button>
                                </div>
                            </div>                            
                        </div>
                    );
                }
                else if(i===2) {
                    return(
                        <div className="container">
                            <div className="row justify-content-center text-center">
                                <div className="col-12" id="tossbuttons">
                                    <h2>Opponent has Won the Toss and elected to Bat First</h2>
                                    <Button variant="secondary" onClick={gotoResults} >
                                        Play Match
                                    </Button>
                                </div>
                            </div>                            
                        </div>
                    );
                }
            }
            return(
                <>
                    {renderRedirect()}
                    {abc()}                    
                </>
            );
        }



        return(
            <>
                { !list[0] ? window.location.replace('/players/list') : ''}
                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-12">
                                {/* This is the front of the card. */}
                                <button variant="info" id="btn" onClick={this.handleClick}>
                                    <div id="flip-card">
                                        <div id="flip-card-inner">
                                            <div id="flip-card-front">
                                                <img src="/images/cointoss.png" alt="CoinToss" id="cointoss"/>
                                            </div>                                    
                                        </div>
                                    </div>
                                </button>
                                <h1>Click on coin to flip</h1>
                            </div>
                        </div>                        
                    </div>
            
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-12">
                                <div id="flip-card" class="xyz">
                                    <div id="flip-card-inner">
                                        <div id="flip-card-front">
                                            <div>
                                            {i === 1 ? <img src="/images/youwintoss.png" id="tosswin" alt="TossWin" /> : <img src="/images/youlosttoss.png" id="tosslost" alt="TossLost" />}
                                            </div>
                                        </div>                                    
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </ReactCardFlip>


                <LetsPlay />


                <div className="container">
                    <div className="row justify-content-center text-center">
                        <TableContainer component={Paper} id="tosstable">
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Player Name</StyledTableCell>
                                        <StyledTableCell align="right">Age</StyledTableCell>
                                        <StyledTableCell align="right">Batting</StyledTableCell>
                                        <StyledTableCell align="right">Bowling</StyledTableCell>
                                        <StyledTableCell align="right">Fielding</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {list.map((row) => (
                                        <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                            {
                                                row.wk ? " (WK)" : ''
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.age}</StyledTableCell>
                                        <StyledTableCell align="right">{row.batting}</StyledTableCell>
                                        <StyledTableCell align="right">{row.bowling}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fielding}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>  
                </div>
            </>
        );
    }
}

export default Toss