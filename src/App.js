import React from 'react';
import './App.css';
import axios from 'axios';
import {Table} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        data:[],
        dataToShow:[],
        start:0,
        end:10
      };
    }
  componentDidMount(){
      axios.get("http://starlord.hackerearth.com/kickstarter")
      .then(res=>{
          this.setState({data:res.data,dataToShow:res.data.slice(0,10)})
      })
      .catch(err=>{
          console.log("Something went wrong while retriving Data")
      })
  }
  loadMore=()=>{
    let end_val = this.state.end + 10;
    if(end_val>this.state.data.length){
      end_val = this.state.data.length;
    }
    this.setState({end:end_val,dataToShow:this.state.data.slice(this.state.start,end_val)})
  }
  render() {
    return  <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>S No</th>
                    <th>Percentage Funded</th>
                    <th>Amount Pleged</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.data.length!==0?this.state.dataToShow.map((row,index)=>{
                      return <tr key={index}>
                        <td>{row["s.no"]}</td>
                        <td>{row["percentage.funded"]}</td>
                        <td>{row["amt.pledged"]}</td>
                      </tr>
                    }):<tr><td colSpan="3" className="norecs">No Records Found</td></tr>
                  }
                </tbody>
              </Table>
              {(this.state.data.length>10 && this.state.dataToShow.length !== this.state.data.length)?<button className="btn btn-primary loadMore" onClick={()=>this.loadMore()}>Load More</button>:null}
            </>
  }
}

export default App;
