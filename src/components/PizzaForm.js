import React from "react"

class PizzaForm extends React.Component {

  constructor(props){
    super(props)
    this.state={
      topping: this.props.pizza.topping,
      size: this.props.pizza.size,
      vegetarian: this.props.pizza.vegetarian,
      id: this.props.pizza.id
    }
    debugger
  }

  //lifecycle method- sets state whenever props change
  componentWillReceiveProps(nextProps) {
      this.setState({
        topping: nextProps.pizza.topping,
        size: nextProps.pizza.size,
        vegetarian: nextProps.pizza.vegetarian,
        id: nextProps.pizza.id
      })
  }

  onSelectChange= e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onRadioChange= e => {
    e.target.value==="Vegetarian" ? this.setState({vegetarian: true}) : this.setState({vegetarian: false})
  }

  onSubmit = (e) => {
    e.preventDefault()
    if(this.state.topping && this.state.size && this.state.id){
      const config={
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      }
      fetch('http://localhost:3000/pizzas/'+this.state.id, config)
      .then(res=>res.json())
      .then(data=>{
        this.props.update(this.state) 
      })
    }else{
      alert("FILL OUT FORM")
    }
  }
 
  render(){
    return(
        <div className="form-row">
          <div className="col-5">
              <input type="text" className="form-control" 
                placeholder="Pizza Topping" 
                name="topping"  
                onChange={this.onSelectChange}value={
                  this.state.topping!==null ? this.state.topping : ""
              }/>
          </div>

          <div className="col">
            <select value={this.state.size} className="form-control" name="size" onChange={this.onSelectChange}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div className="col">
            <div className="radio">
              <div className="form-check" name="vegetarian" onChange={this.onRadioChange}>
                <input className="form-check-input" type="radio" value="Vegetarian" 
                  checked={this.state.vegetarian}/>

                <label className="form-check-label">
                  Vegetarian
                </label>
              </div>
              <div className="form-check"  name="non-vegetarian" onChange={this.onRadioChange}>
                <input className="form-check-input" type="radio" value="Not Vegetarian" 
                  checked={!this.state.vegetarian}/>

                <label className="form-check-label">
                  Not Vegetarian
                </label>
              </div>
              </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success" onClick={this.onSubmit}>Submit</button>
          </div>
        </div>
    )
  }
}

export default PizzaForm
