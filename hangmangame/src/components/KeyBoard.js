import React from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid';
import '../styles/main.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';


class KeyBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowedKeys: props.allowedKeys || ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        };
        this.onKeyPress = this.onKeyPress.bind(this);

    }

    onKeyPress(event) {
        if (event.target.dataset.value) {
            const keyVal = event.target.dataset.value;
            this.props.onKeyPress(keyVal);
        }
    }

    render() {
        return (
            <ul className="inputKeys" onClick={this.onKeyPress}>
               {
                   this.state.allowedKeys.map((key) => {
                        let listClasses;
                        const matchedIndex = this.props.pressedKeys.indexOf(key);
                        if (matchedIndex > -1) {
                            listClasses = classNames({ inputKey: true }, { highlightedInputKey: true }); 
                        } else {
                            listClasses = classNames({ inputKey: true }, { highlightedInputKey: false }); 
                        }
                        return (<li data-value={key} className={listClasses} key={shortid.generate()}>{key}</li>)
                    })
                } 
            </ul>
        );
    }

}

KeyBoard.defaultProps = {
    allowedKeys: null,
    onKeyPress: function () {},
    pressedKeys: []
};

KeyBoard.propTypes = {
    allowedKeys: PropTypes.array,
    onKeyPress: PropTypes.func,
    pressedKeys: PropTypes.array
}

export default KeyBoard;