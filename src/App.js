import React from 'react';
import './App.css';
import Chessboard from "chessboardjsx"

const boardsContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  width: "1024",
  backgroundColor: "black"
};

class BigBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
        isLoaded: false
    };
  } 
  componentDidMount(){
    this.ticker = setInterval(() => this.tick(), 100);
    } 
    
  componentWillUnmount(){
      clearInterval(this.ticker)
    }

    tick = () => {
      fetch('http://localhost:3000/api/readboard',{
          method: 'GET',
      })
      .then((response)=>{
          return response.text();
          //this.setState({
          //    position: data,
          //    isLoaded: true});
      })
      .then((text)=>{
          var FENstring;
          FENstring = text.toString()
          console.log(FENstring);
          this.setState({
              position: FENstring,
              isLoaded: true
          });

      })
  }

  render()
  {
  return (
    <div style={boardsContainer}>
      <div className="chessboard">
        <header className="chessboard-header">
        </header>
      </div>
      <div>
        <Chessboard position={this.state.position}
                    draggable="false"
                    width="1024"
                    lightSquareStyle={{ backgroundColor: "#ffffff" }}
                    darkSquareStyle={{ backgroundColor: "#AF2323" }}
                     />
      </div>
    </div>
  );
  }
}

export default BigBoard;
