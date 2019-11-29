// 'use strict';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       stepCount: -1, result: 10,
    }
  }
  
qsnsObj = {
      "qsns": [
         {
      "qsn": "Which is the largest country in the world by population?",
      "optn": ["India", "USA", "China", "Russia"],
      "ca": "China"
          },
          {
      "qsn": "When did the second world war end?",
      "optn": ["1945", "1939", "1944", "1942"],
      "ca": "1945"
          },
          {
      "qsn": "Which was the first country to issue paper currency?",
      "optn": ["USA", "France", "Italy", "China"],
      "ca": "China"
          },
          {
      "qsn": "Which city hosted the 1996 Summer Olympics?",
      "optn": ["Atlanta", "Sydney", "Athens", "Beijing"],
      "ca": "Atlanta"
          },
          {
      "qsn": "Who inventede telephone?",
      "optn": ["Albert Einstein", "Alexander Graham Bell", "Issac Newton", "Marie Curie"],
      "ca": "Alexander Graham Bell"
          },
        ]
}

landing = () => {
  return (<button onClick={e => this.next()}>Start the Quiz</button>)
}

nonExist = () => {
  return (
  <>
  <p>Nonexistent or Invalid Question, So Sorry ;)</p>
  <button onClick={e => this.tryAgain()}>Maybe Start over?</button>
  </>
  )
}

Score = () => {
  return (<div>{`Your Score is ${this.state.result} out of ${this.qsnsObj.qsns.length}`}</div>)
}

tryAgainButton = () => {
  return (<button onClick={e => this.tryAgain()}>Wanna try again?</button>)
}

results = () => {
  const {result} = this.state
  switch (true) {
    case (result === this.qsnsObj.qsns.length):
        return (
          <>
          {this.Score()}
          <p>Congratulations, Perfect Score: Well Done</p>
          {this.tryAgainButton()}
          </>
        )
    case (result >= this.qsnsObj.qsns.length/2 && result < this.qsnsObj.qsns.length):
        return (
          <>
          {this.Score()}
          <p>Good Work</p>
          {this.tryAgainButton()}
          </>
        )
    case (result <= this.qsnsObj.qsns.length/2):
        return (
          <>
          {this.Score()}
          <p>Poor Perfomance</p>
          {this.tryAgainButton()}
          </>
        )
    default:
      return (
        <>
        {this.Score()}
        <p>Not Bad</p>
        {this.tryAgainButton()}
        </>
      );
  }
}

tryAgain = () =>{
  this.setState({result: 0, stepCount: 0})
}

next = () => {
  this.setState({stepCount: this.state.stepCount + 1})
}

Quiz = (qsn) => {
  const {qsno} = qsn
  return (
    qsno >= 0 && qsno < this.qsnsObj.qsns.length ? (
          <>
          <p>{ this.qsnsObj.qsns[qsno].qsn}</p>
          <div>
            {
            this.qsnsObj.qsns[qsno].optn.map(ans => {
                return (
                  <label key={ans}>
                      <input type="radio" name={qsno} value={ans} onChange={this.answer} />
                      {ans}
                  </label>
                )
            })
            }
          </div>
        </> 
    ) : this.nonExist()
  );
} 

answer = async e => {
  const ansname = e.target.name
  const ansvalue = e.target.value
  await(ansvalue === this.qsnsObj.qsns[ansname].ca ? this.setState({ result: this.state.result + 1 }) : null )
  this.next()
}

render() {
    const {stepCount} = this.state
    return(
      stepCount === -1 ? this.landing() : stepCount === this.qsnsObj.qsns.length ? this.results() : <this.Quiz qsno={stepCount} />
    )
  }
}

export default App;
