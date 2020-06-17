import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { i } from './Toss';
import {list} from './match'
import { Loading } from '../components/LoadingComponent';
import '../style/results.css';


//i === 1 if tosswon, 2 if tosslost


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




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
  
  function createBattingData(name, runs, balls) {
    return { name, runs, balls };
  }
  
  const opponentBattingRows = [
    createBattingData('Kyle Abbott', getRandomInt(41,53), getRandomInt(27,35)),
    createBattingData('Tom Alsop', getRandomInt(35,40), getRandomInt(22,31)),
    createBattingData('Keith Barker', getRandomInt(25,34), getRandomInt(16,25)),
    createBattingData('Mason Crane', getRandomInt(10,24), getRandomInt(8,20)),
  ];


  function createBowlingData(name, wickets, runs) {
    return { name, wickets, runs };
  }

  const opponentBowlingRows = [
    createBowlingData('Brad Wheel', getRandomInt(2,3), getRandomInt(20,40)),
    createBowlingData('Joe Weatherley', getRandomInt(1,2), getRandomInt(15,29)),
    createBowlingData('Chris Wood', 1, getRandomInt(30,35)),
    createBowlingData('James Vince', getRandomInt(0,1), getRandomInt(36,51)),
  ];


class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playingXI: list,
            isLoading: false,
        };
    }

    componentDidMount = async() => {
        this.setState({ isLoading: true })

        setTimeout( () => {
            this.setState({ isLoading: false })
        } , 5000);
    }


    render() {

        const classes = makeStyles({
            table: {
              minWidth: 700,
            },
        });

        var teamScores = getTeamScores();
        var yourTeamScore = parseInt(teamScores[0],10);
        var opponentTeamScore = parseInt(teamScores[1],10);

        function getTeamScores() {
            if(parseInt(i, 10) === parseInt(2, 10) || parseInt(i, 10) === parseInt(1, 10)){
                var a = getRandomInt(170, 230);
                var b = getRandomInt(170, 230);
                if(a===b) {
                    b=b-1;
                }
                else if(a>b) {
                    a=b+getRandomInt(1,6);
                }
                return [a,b];
            } 
            else {                  //i===3 ; batfirst
                a = getRandomInt(170, 230);
                b = getRandomInt(170, 230);
                if(a===b) {
                    b=b-1;
                }
                else if(a<b) {
                    b=a+getRandomInt(1,6);
                }
                return [a,b];
            }  
        }

        var noOfOvers = funcNoOfOvers();
        var yourTeamNoOfOvers = noOfOvers[0];
        var opponentTeamNoOfOvers = noOfOvers[1];


        function funcNoOfOvers() {
            if(i===1 || i===2) {
                if(yourTeamScore > opponentTeamScore) {
                    return [getRandomInt(14,19), 20]
                }
                else {
                    return [20, 20]
                }
            }
            else {              //i===3 ; batfirst
                if(yourTeamScore > opponentTeamScore) {
                    return [20, 20]
                }
                else {
                    return [20, getRandomInt(14,19)]
                }
            }   
        }


        const battingindex = [[getRandomInt(52,61), getRandomInt(27,35)], [getRandomInt(38,51), getRandomInt(25,33)] , [getRandomInt(18,24),getRandomInt(16,22)], [getRandomInt(8,15),getRandomInt(4,9)]];
        const bowlingindex = [[getRandomInt(2,3),getRandomInt(25,31)], [getRandomInt(1,2),getRandomInt(10,15)], [getRandomInt(0,1), getRandomInt(16,28)], [0, getRandomInt(29,43)]];
        
        var batsmanCount = getRandomInt(0,3);
        var bowlingCount = getRandomInt(0,2);

        return(
            <>
                { !list[0] ? window.location.replace('/players/list') : ''}
                {console.log(list.reverse())}

                {
                    this.state.isLoading ? <Loading></Loading> :

                    <>
                        <div className="container">
                            <div className="row justify-content-center text-center resultsgifs">
                                <div className="col-12 col-sm-6">
                                    <img src="/images/gameOver.gif" id="gameOverImage" alt="Game is Over Now" />
                                </div>
                                <div className="col-12 col-sm-6">
                                    {
                                        yourTeamScore > opponentTeamScore ? 
                                        <img src="/images/wonMatch.gif" id="resultMatchImageWin" alt="You won the Match" />
                                        :
                                        <img src="/images/lostMatch.gif" id="resultMatchImageLoss" alt="You lost the Match" />
                                    }
                                </div>
                            </div>
                        </div>

                        <TableContainer component={Paper} id="tablecontainer">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-6 column1">
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>YOUR TEAM {i===1 || i===3 ? '(TOSS)' : ''}</StyledTableCell>
                                                    <StyledTableCell></StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    (list.slice(batsmanCount, batsmanCount+4)).map((row, ind) => (
                                                        <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {row.name}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="right">{battingindex[ind][0]}({battingindex[ind][1]})</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </div>


                                    <div className="col-12 col-md-6 column2">
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="left">
                                                        Overs {yourTeamNoOfOvers}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {yourTeamScore}/{getRandomInt(7,9)}
                                                    </StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {opponentBowlingRows.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{row.wickets}/{row.runs}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>                    



                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-6 column1">
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>HAMPSHIRE {i===2 ? '(TOSS)' : ''}</StyledTableCell>
                                                    <StyledTableCell></StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {opponentBattingRows.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{row.runs}({row.balls})</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="col-12 col-md-6 column2">
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="light">
                                                        Overs: {opponentTeamNoOfOvers}                                                
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {opponentTeamScore}/{getRandomInt(7,9)}
                                                    </StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    (list.reverse().slice(bowlingCount, bowlingCount+4)).map((row, ind) => (
                                                        <StyledTableRow key={row.name}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {row.name}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="right">{bowlingindex[ind][0]}/{bowlingindex[ind][1]}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </TableContainer>
                    </>
                }
            </>
        );
    }
}

export default Results