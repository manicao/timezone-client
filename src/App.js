import React,{Component} from 'react';
import axios from "axios";


class App extends Component {

  constructor (props) {
    super(props)
    
    this.state={
      time:'',
      timezone:'',
      result:'',
      error: false
    }
    this.onSubmit=this.onSubmit.bind(this);
  }

  onSubmit(e){
     e.preventDefault();

      let {time,timezone}=this.state;
      axios.post("https://timezone-task.herokuapp.com/api/timezone", {time,timezone})
      .then(res=>{
        console.log(res);
        this.setState({result:res.data.response.time})
      })
      .catch(err=>{this.setState({error:true})});
      
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <input type="text" placeholder="Hora (HH:mm:ss)" 
              onChange={(e)=>this.setState({time:e.target.value})}
              value={this.state.time}
          />
          <br/>
          <input type="text" placeholder="Zona Horaria" 
              onChange={(e)=>this.setState({timezone:e.target.value})}
              value={this.state.timezone}
          />
          <br/>
          <button>Convertir</button>
          <br/>
          {
            this.state.error ?
            ( <div>
                <p>Ha ocurrido un Error</p>
              </div>)
            :(
              <div>
                <p>La Hora convertida a UTC: {this.state.result}</p>
              </div>
            )
          }
         
        </div>
      </form>
    )
  }
}

export default App;
