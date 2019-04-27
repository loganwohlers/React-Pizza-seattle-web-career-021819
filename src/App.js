import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  constructor(){
    super()
    this.state={
      currPizza: "",
      pizzas: []
    }
  }

  getAllPizzas(){
    fetch('http://localhost:3000/pizzas')
    .then(res=>res.json())
    .then(pizzas=>{
      console.log(pizzas)
      this.setState({pizzas})
    })
  }

  componentDidMount(){
    this.getAllPizzas()
  }

  updatePizza= (p) => {
    this.setState({
      currPizza: p
    })
    this.getAllPizzas()
  }

  onEditClick=(p)=>{
    this.setState({
      currPizza: p
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.currPizza} update={this.updatePizza}/>
        <PizzaList onEditClick={this.onEditClick} pizzas={this.state.pizzas}/>
      </Fragment>
    );
  }
}

export default App;
