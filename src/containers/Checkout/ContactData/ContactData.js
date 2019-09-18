import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './ContactData.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipCode'
        },
        value: '',
        validation: {
          required: true,
          // minLength: 5,
          // maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
    loading: false
  }

  checkValidity = (value, rules) => {
    let isValid = true

    if(!rules) {
      return true
    }

    if(rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    // if(rules.minLength) {
    //   isValid = value.minLength >= rules.minLength && isValid
    // }

    // if(rules.maxLength) {
    //   isValid = value.maxLength <= rules.maxLength && isValid
    // }

    return isValid
  }

  orderHandler = (event) => {
    event.preventDefault()
    // console.log(this.props.ingredients)

    this.setState({ loading: true })

    const formData = {}

    for(let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
   
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    
    }
   
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrdersForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrdersForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true

    updatedOrdersForm[inputIdentifier] = updatedFormElement

    let formIsValid = true

    for(let inputIdentifier in updatedOrdersForm) {
      formIsValid = updatedOrdersForm[inputIdentifier].valid && formIsValid
    }

    this.setState({ orderForm: updatedOrdersForm, formIsValid: formIsValid })
  }

  render() {
    const formElementArray = []

    for (let key in this.state.orderForm ) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    )

    if(this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData)