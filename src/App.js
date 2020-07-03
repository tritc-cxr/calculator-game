import React from 'react'
import './App.css'
import generate from './generate'

const WIN = 'WIN'
const LOSE = 'LOSE'

class App extends React.Component {
    constructor(props) {
        super(props)
        const initState = {
            ...generate(),
            gameEnd: false,
            gameResult: null
        }

        this.initState = initState
        this.state = { ...initState }
    }

    doReset = e => {
        e.preventDefault()
        this.setState(this.initState)
    }

    doNew = e => {
        e.preventDefault();
        window.location.reload();
    }

    doClickButton = op => e => {
        e.preventDefault()
        if (this.state.gameEnd) return

        this.setState(prevState => {
            // Calculate current result
            const currentResult = op.func(prevState.currentResult)
            // Reduce remaining moves
            const moves = prevState.moves - 1

            const gameEnd = moves === 0
            const gameResult = currentResult === prevState.goal ? WIN : LOSE

            return { currentResult, moves, gameEnd, gameResult }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="help-text">
                    <div>
                        <div className="help-text__label">goal</div>
                        <h1 className="help-text__value">{this.state.goal}</h1>
                    </div>
                    <div>
                        <div className="help-text__label">moves</div>
                        <h1 className="help-text__value">{this.state.moves}</h1>
                    </div>
                </div>
                <div className="display">{this.state.currentResult}</div>
                <div className="display-result">{this.state.gameEnd ? 'YOU ' + this.state.gameResult : null}</div>
                <div className="buttons">
                    {this.state.operators.map((op, index) => (
                        <button
                            key={index}
                            className="button"
                            onClick={this.doClickButton(op)}
                        >
                            {op.label}
                        </button>
                    ))}

                    <button
                        className="button button--secondary button--clear"
                        onClick={this.doReset}
                    >
                        RESET
                    </button>
                    <button className="button button--secondary button--help"
                        onClick={this.doNew}>NEW
                    </button>
                </div>
            </div>
        )
    }
}

export default App
