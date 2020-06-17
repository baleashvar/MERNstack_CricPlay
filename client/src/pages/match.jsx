import React from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { ButtonBase, Typography, makeStyles } from '@material-ui/core';
import '../style/match.css';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
        marginBottom: '0.5vh',
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('md')]: {
        width: '100% !important', // Overrides inline-style
        height: 500,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 250,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 10,
      bottom: 0,
    //   display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
      height: '100%'
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageBody: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        // display: 'flex',
      width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
      },
    imageTitle: {
        fontSize: '20px',
      position: 'relative',
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(1) + 3}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }));




const PlayMatch= () => {
    const [redirect, setRedirect] = React.useState(false);

    const renderRedirect = () => {
        if(redirect) {
            return <Redirect to='/toss' />
        }
    }
    const gotoToss = () => {
        if( list.length !== 11 ) {
            alert('You must select 11 players to play a match\nCurrent Team Length is: ' + list.length + '\nIf navigated through back button, please reload page.');
        }
        else {
            // alert('Playing XI is: '+JSON.stringify(list));
            setRedirect(!redirect)
            // window.location.replace('/toss');     
        }
    }
    return(
        <>
            {renderRedirect()}
            <Button variant="secondary" onClick={gotoToss} >
                Play Match
            </Button>
        </>
    );
}

const SelectedPlayers = () => {
    return(
        <div id="playeradded">
            <span><i class="fa fa-check-circle" aria-hidden="true"></i></span>
            Player added to Playing XI
        </div>
    );
}


var count = 0;
var list = [];
const RenderPlayerInfo = ({player}) => {  
    const [displayList, setDisplayList] = React.useState(false);  
    const [inlistornot, setinlistornot] = React.useState(false);

    const handleClick = (player, temp) => {
        if(displayList === false){
            count = count + 1;
        }
        else{
            count = count - 1;
        }

        setDisplayList(!displayList)

        temp=temp+1;
        setinlistornot(!inlistornot)

        // alert(temp);

        if(temp === 2) {
            var index = list.indexOf(player); //to remove a player.name from the list
            if(index > -1) {
                list=getUnique(list)
                list.splice(index, 1);
            }
        }

        return temp        
    };

    const classes = useStyles();

    function getUnique(list){
        var uniqueArray = [];
        
        // Loop through array values
        for(var i=0; i < list.length; i++){
            if(uniqueArray.indexOf(list[i]) === -1) {
                uniqueArray.push(list[i]);
            }
        }
        return uniqueArray;
    }


    var temp=0;
    inlistornot&&temp++

    return(
        <>
            {
                performance.navigation.type === 2 ? window.location.reload() : ''                
            }

            {displayList&&<SelectedPlayers />}
            
            <ButtonBase 
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: '100%',
                    }}
                onClick={() => {
                    list.push(player);
                    temp=handleClick(player, temp);
                    }
                }
            >
                {
                    player.batting > player.bowling ? 
                    <span
                        className={classes.imageSrc}
                        style={{
                        backgroundImage: `url('/images/battingimage.jpg')`
                        }}
                    />
                    :
                    <span
                        className={classes.imageSrc}
                        style={{
                        backgroundImage: `url('/images/bowlingimage.jpg')`
                        }}
                    />
                }
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                    <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        className={classes.imageTitle}
                    >
                        {player.name}
                        <span className={classes.imageMarked} />
                    </Typography>
                </span>
                <span className={classes.imageBody}>
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-5">
                                Age: {player.age}
                            </div>
                            <div className="col-5">
                                WK?: {player.wk.toString() === 'true' ? "Yes" : "No"}                                    
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-10 col-md-4">
                                Batting Skills: {player.batting}
                            </div>
                            <div className="col-10 col-md-4">
                                Bowling Skills: {player.bowling}
                            </div>
                            <div className="col-10 col-md-4">
                                Fielding Skills: {player.fielding}
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-10 col-md-4">
                                Highest Score: {player.highestscore}
                            </div>
                            <div className="col-10 col-md-4">
                                Best Bowl Fig: {player.bestbowlfig}
                            </div>
                        </div>
                    </div>
                </span>
            </ButtonBase>
        </>
    );
}

export {RenderPlayerInfo, PlayMatch, list}