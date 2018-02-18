import React from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid';
import '../styles/main.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class UserInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <dl className="userInputContainer">
                    <dt><h4>Question: {this.props.questionTitle}</h4></dt>
                    <dd>
                        <ul>
                            {
                                this.props.questionAnsArr.map((letter) => {
                                    if (this.props.pressedKeys.indexOf(letter) > -1) {
                                        return (<li className="userInput">{letter}</li>);
                                    } else {
                                        return (<li className="emptyUserInput">_</li>);
                                    }
                                })
                            }
                        </ul>
                    </dd>
                </dl>
                <h4>
                    Remaining Lives: <span className="remainingLives">{this.props.remainingLives}</span>
                </h4>
            </React.Fragment>
        );
    }
}

UserInput.defaultProps = {
    allowedQuestions: [],
    remainingLives: 10,
    pressedKeys: []
};

UserInput.propTypes = {
    allowedQuestions: PropTypes.array,
    remainingLives: PropTypes.number,
    pressedKeys: PropTypes.array
}

export default UserInput;