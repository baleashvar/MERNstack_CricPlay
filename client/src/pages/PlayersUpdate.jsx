import React, { Component } from 'react';
import { Form, Label, FormGroup, Input, Button, FormFeedback } from 'reactstrap';
import api from '../api/index';

class PlayersUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            age: '',
            batting: '',
            bowling: '',
            fielding: '',
            wk: '',
            highestscore: '',
            bestbowlfig: '',
            touched: {
                name: false,
                age: false,
                batting: false,
                bowling: false,
                fielding: false,
                highestscore: false,
                bestbowlfig: false,
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleUpdatePlayer = this.handleUpdatePlayer.bind(this);
    }



    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })
    }


    validate(name, age, batting, bowling, fielding, highestscore, bestbowlfig) {
        const errors = {
            name: '',
            age: '',
            batting: '',
            bowling: '',
            fielding: '',
            highestscore: '',
            bestbowlfig: '',
        };

        //Name Validation
        if(this.state.touched.name && name.length < 5)
            errors.name = 'Name should be >= 5 characters. ';
        
        else if (this.state.touched.name && name.length > 30)
            errors.name = 'Name should be <= 30 characters. ';


        const regNaturalNo = /^\d+$/;


        //Age Validation
        if(this.state.touched.age && !regNaturalNo.test(age))
            errors.age = 'Age can only be a natural number. ';

        else if(this.state.touched.age && age < 1)
            errors.age = 'Age should be > 0. ';
        
        else if (this.state.touched.age && age > 70)
            errors.age = 'Age should be <= 70. ';

        // if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
        //     errors.email = 'Email should contain a @.'


        //Batting Validation
        if(this.state.touched.batting && !regNaturalNo.test(batting))
            errors.batting = 'Batting Skills can only be a natural number. ';

        else if(this.state.touched.batting && batting < 1)
            errors.batting = 'Batting Skills should be > 0. ';
        
        else if (this.state.touched.batting && batting > 99)
            errors.batting = 'Batting Skills should be <= 99. ';


        //Bowling Validation
        if(this.state.touched.bowling && !regNaturalNo.test(bowling))
            errors.bowling = 'Bowling Skills can only be a natural number. ';

        else if(this.state.touched.bowling && bowling < 1)
            errors.bowling = 'Bowling Skills should be > 0. ';
        
        else if (this.state.touched.bowling && bowling > 99)
            errors.bowling = 'Bowling Skills should be <= 99. ';



        //Fielding Validation
        if(this.state.touched.fielding && !regNaturalNo.test(fielding))
            errors.fielding = 'Fielding Skills can only be a natural number. ';

        else if(this.state.touched.fielding && fielding < 1)
            errors.fielding = 'Fielding Skills should be > 0. ';
        
        else if (this.state.touched.fielding && fielding > 99)
            errors.fielding = 'Fielding Skills should be <= 99. ';
        


        
        //Highest Score Validation
        if(this.state.touched.highestscore && !regNaturalNo.test(highestscore))
            errors.highestscore = 'Highest Batting Score can only be a natural number. ';

        else if(this.state.touched.highestscore && highestscore < 1)
            errors.highestscore = 'Highest Batting Score should be > 0. ';
        
        else if (this.state.touched.highestscore && highestscore > 999)
            errors.highestscore = 'Highest Batting Score should be <= 999. ';




        // const regBestBowlFig = /[0-9](?:\/)[0-9](?:0\-9)$/;

        // //Best Bowl Figure Validation
        // if(this.state.touched.bestbowlfig && !regBestBowlFig.test(bestbowlfig))
        //     errors.bestbowlfig = 'Best Bowling Figure must be of the form [0-11]/[1-99]. ';


        return errors;
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }



    handleUpdatePlayer = async(event) => {

        const errors = this.validate(this.state.name, this.state.age, this.state.batting, 
            this.state.bowling, this.state.fielding, this.state.highestscore, this.state.bestbowlfig)


        if(errors.name !== '' || errors.age !== '' || errors.batting !== '' || errors.bowling !== ''
            || errors.fielding !== '' || errors.highestscore !== '' || errors.bestbowlfig !== '') {
            alert('Please meet the Form Validation Requirements first.');
            event.preventDefault();
            return;
        }


        const name = this.state.name
        const age = this.state.age
        const batting = this.state.batting
        const bowling = this.state.bowling
        const fielding = this.state.fielding
        const wk = this.state.wk
        const highestscore = this.state.highestscore
        const bestbowlfig = this.state.bestbowlfig
        const id = this.state.id

        const payload = { id, name, age, batting, bowling, fielding, wk, highestscore, bestbowlfig }

        event.preventDefault();     //Most important

        // alert(JSON.stringify(payload))
        alert('Updating Player. Please wait.')
        
        await api.updatePlayerById(id, payload)
            .then(res => {
                alert(`Player updated successfully with details\n` + JSON.stringify(payload))
                this.setState({
                    name: '',
                    age: '',
                    batting: '',
                    bowling: '',
                    fielding: '',
                    wk: '',
                    highestscore: '',
                    bestbowlfig: ''
                })
                window.location.replace('/players/list');
            });
    }

    componentDidMount = async() => {
        const {id} = this.state
        const player = await api.getPlayerById(id)

        this.setState({
            name: player.data.data.name,
            age: player.data.data.age,
            batting: player.data.data.batting,
            bowling: player.data.data.bowling,
            fielding: player.data.data.fielding,
            wk: player.data.data.wk,
            highestscore: player.data.data.highestscore,
            bestbowlfig: player.data.data.bestbowlfig
        })
    }

    render() {

        const errors = this.validate(this.state.name, this.state.age, this.state.batting, 
            this.state.bowling, this.state.fielding, this.state.highestscore, this.state.bestbowlfig)

        return (
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-12">
                        <h2>Update Player</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <Form onSubmit={this.handleUpdatePlayer}>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name"
                                    placeholder="Name"
                                    value={this.state.name}
                                    valid={errors.name === ''}
                                    invalid={errors.name !== ''}
                                    onBlur={this.handleBlur('name')}
                                    onChange={this.handleInputChange}
                                    required
                                    // onChange={async (event) => this.setState({ name: event.target.value })} 
                                />
                                <FormFeedback>
                                    {errors.name}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="age">Age</Label>
                                <Input type="number" id="age" name="age" 
                                    placeholder="Age"
                                    value={this.state.age}
                                    valid={errors.age === ''}
                                    invalid={errors.age !== ''}
                                    onBlur={this.handleBlur('age')}
                                    onChange={this.handleInputChange}
                                    required 
                                    // onChange={async (event) => this.setState({ age: event.target.value })} 
                                />
                                <FormFeedback>
                                    {errors.age}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="batting">Batting Skills</Label>
                                <Input type="number" id="batting" name="batting"
                                    placeholder="Batting Skills Rating (Between 1 to 100)"
                                    value={this.state.batting}
                                    valid={errors.batting === ''}
                                    invalid={errors.batting !== ''}
                                    onBlur={this.handleBlur('batting')}
                                    onChange={this.handleInputChange}
                                    required
                                    // onChange={async (event) => this.setState({ batting: event.target.value })} 
                                />
                                <FormFeedback>
                                    {errors.batting}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="bowling">Bowling Skills</Label>
                                <Input type="number" id="bowling" name="bowling"
                                    placeholder="Bowling Skills Rating (Between 1 to 100)"
                                    value={this.state.bowling}
                                    valid={errors.bowling === ''}
                                    invalid={errors.bowling !== ''}
                                    onBlur={this.handleBlur('bowling')}
                                    onChange={this.handleInputChange}
                                    required
                                    // onChange={async (event) => this.setState({ bowling: event.target.value })} 
                                />
                                <FormFeedback>
                                    {errors.bowling}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="fielding">Fielding Skills</Label>
                                <Input type="number" id="fielding" name="fielding"
                                    placeholder="Fielding Skills Rating (Between 1 to 100)"
                                    value={this.state.fielding}
                                    valid={errors.fielding === ''}
                                    invalid={errors.fielding !== ''}
                                    onBlur={this.handleBlur('fielding')}
                                    onChange={this.handleInputChange}
                                    required
                                    // onChange={async (event) => this.setState({ fielding: event.target.value })} 
                                />
                                <FormFeedback>
                                    {errors.fielding}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="highestscore">Highest Batting Score</Label>
                                <Input type="number" id="highestscore" name="highestscore"
                                     placeholder="Highest Batting Score"
                                     value={this.state.highestscore}
                                     valid={errors.highestscore === ''}
                                     invalid={errors.highestscore !== ''}
                                     onBlur={this.handleBlur('highestscore')}
                                     onChange={this.handleInputChange}
                                     required
                                    // onChange={async (event) => this.setState({ highestscore: event.target.value })} 
                                />
                                <FormFeedback>
                                    {errors.highestscore}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="bestbowlfig">Best Bowling Figure</Label>
                                <Input type="text" id="bestbowlfig" name="bestbowlfig"
                                    placeholder="Best Bowling Figure (Format: 3/38)"
                                    value={this.state.bestbowlfig}
                                    valid={errors.bestbowlfig === ''}
                                    invalid={errors.bestbowlfig !== ''}
                                    onBlur={this.handleBlur('bestbowlfig')}
                                    onChange={this.handleInputChange}
                                    required
                                    // onChange={async (event) => this.setState({ bestbowlfig: event.target.value })} 
                                />
                                <FormFeedback>
                                    {errors.bestbowlfig}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="wk"
                                        checked={this.state.wk} 
                                        onChange={async (event) => this.setState({ wk: event.target.checked })} />
                                    Does he keep wickets?
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" value="submit" id="updatebutton" color="primary">Update Player</Button>
                                <Button className="btn btn-danger" href={'/players/list'}>Cancel</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayersUpdate