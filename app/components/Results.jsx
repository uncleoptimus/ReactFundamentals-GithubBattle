var React = require('react');
var PropTypes = React.PropTypes;
var styles = require('../styles');
var UserDetails = require('./UserDetails.jsx');
var UserDetailsWrapper = require('./UserDetailsWrapper.jsx');
var Link = require('react-router').Link;
var MainContainer = require('./MainContainer.jsx');
var Loading = require('./Loading.jsx');

function puke (obj) {
  return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
}

function StartOver () {
  return (
    <div className="col-sm-12" style= {styles.space}>
      <Link to='/playerOne'>
        <button type="button" className="btn btn-lg btn-danger">Start Over</button>
      </Link>
    </div>
  )
}
function Results (props) {
  if (props.isLoading) {
    return (
      <Loading />
    )
  }

  if (props.scores[0] === props.scores[1]) {
    return (
      <MainContainer>
        <h1>Its a Tie!</h1>
        <StartOver />
      </MainContainer>
    )
  }
  var winningIndex = props.scores[0] > props.scores[1] ? 0 : 1;
  var losingIndex = winningIndex === 0 ? 1 : 0;
  return (
    <MainContainer>
      <h1>Results</h1>
      <div className="col-sm-8 col-sm-offset-2">
        <UserDetailsWrapper header='Winner'>
          <UserDetails score={props.scores[winningIndex]} info={props.playersInfo[winningIndex]} />
        </UserDetailsWrapper>
        <UserDetailsWrapper header='Loser'>
          <UserDetails score={props.scores[losingIndex]} info={props.playersInfo[losingIndex]} />
        </UserDetailsWrapper>
      </div>
      <StartOver />
    </MainContainer>
  )
}

Results.PropTypes = {
  playersInfo: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  scores: PropTypes.array.isRequired
}

module.exports = Results;