import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

const initialTypes = [
  {
    id: 'BALANCE',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    displayText: 'Your Balance',
    imageAltText: 'balance',
    cname: 'balance-details',
    Amount: 0,
    dTestId: 'balanceAmount',
  },
  {
    id: 'INCOME',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    displayText: 'Your Income',
    imageAltText: 'income',
    cname: 'income-details',
    Amount: 0,
    dTestId: 'incomeAmount',
  },
  {
    id: 'EXPENSES',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    displayText: 'Your Expenses',
    imageAltText: 'expenses',
    cname: 'expense-details',
    Amount: 0,
    dTestId: 'expensesAmount',
  },
]
const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: 'Income',
    historyArr: [],
  }

  onDeleteTransaction = value => {
    const {historyArr} = this.state
    const filteredArr = historyArr.filter(ele => ele.id !== value)
    this.setState({historyArr: filteredArr})
    // const filteredArr = historyArr.filter(ele => ele.id === value)
    // if (filteredArr[0].type === 'Income') {
    //   this.setState({
    //     balance: balance - parseInt(filteredArr[0].amount),
    //     income: income - parseInt(filteredArr[0].amount),
    //     expense,
    //     historyArr: mainItem,
    //   })
    // }
    // if (filteredArr[0].type === 'Expenses') {
    //   this.setState({
    //     balance: balance + parseInt(filteredArr[0].amount),
    //     income,
    //     expense: expense - parseInt(filteredArr[0].amount),
    //     historyArr: mainItem,
    //   })
    // }
  }

  onClickAdd = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newObj = {
      id: uuidv4(),
      title,
      amount,
      type: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
    }
    // if (type === 'Income') {
    //   this.setState({
    //     balance: balance + parseInt(amount),
    //     income: income + parseInt(amount),
    //   })
    // }
    // if (type === 'EXPENSES') {
    //   this.setState({
    //     balance: balance - parseInt(amount),
    //     expense: expense + parseInt(amount),
    //   })
    // }
    this.setState(prevState => ({
      title: '',
      amount: '',
      type: 'Income',
      historyArr: [...prevState.historyArr, newObj],
    }))
  }

  getIncome = () => {
    const {historyArr} = this.state
    let income = 0
    historyArr.forEach(each => {
      if (each.type === 'Income') income += parseInt(each.amount)
    })
    return income
  }

  getExpense = () => {
    const {historyArr} = this.state
    let expense = 0
    historyArr.forEach(each => {
      if (each.type === 'Expenses') expense += parseInt(each.amount)
    })
    return expense
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  render() {
    const {title, amount, type, historyArr} = this.state
    initialTypes[1].Amount = parseInt(this.getIncome())
    initialTypes[2].Amount = parseInt(this.getExpense())
    initialTypes[0].Amount = parseInt(this.getIncome() - this.getExpense())
    return (
      <div className="bg">
        <div className="main-container">
          <div className="user-card">
            <h1 className="heading">Hi, Richard</h1>
            <p className="par">
              Welcome back to your{' '}
              <span className="decoration">Money Manager</span>
            </p>
          </div>
          <ul className="list-container">
            {initialTypes.map(ele => (
              <MoneyDetails key={ele.id} typeDetails={ele} />
            ))}
          </ul>
          <div className="flexi">
            <div className="form1">
              <h1 className="heading2">Add Transaction</h1>
              <form onSubmit={this.onClickAdd}>
                <div>
                  <label htmlFor="TITLE" className="sub-head">
                    TITLE
                  </label>
                  <br />
                  <input
                    id="TITLE"
                    onChange={this.onChangeTitle}
                    type="text"
                    placeholder="TITLE"
                    className="input-field"
                    value={title}
                  />
                </div>
                <div>
                  <label htmlFor="AMOUNT" className="sub-head">
                    AMOUNT
                  </label>
                  <br />
                  <input
                    id="AMOUNT"
                    onChange={this.onChangeAmount}
                    type="text"
                    placeholder="AMOUNT"
                    className="input-field"
                    value={amount}
                  />
                </div>
                <div>
                  <label htmlFor="TYPE" className="sub-head">
                    TYPE
                  </label>
                  <br />
                  <select
                    id="TYPE"
                    className="input-field"
                    value={type}
                    onChange={this.onChangeType}
                  >
                    {transactionTypeOptions.map(ele => (
                      <option key={ele.optionId} value={ele.optionId}>
                        {ele.displayText}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="addBtn">
                  Add
                </button>
              </form>
            </div>
            <div className="hist">
              <h1 className="heading2">History</h1>
              <div className="table-headings">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
                <p />
              </div>
              <ul className="list-container2">
                {historyArr.map(ele => (
                  <TransactionItem
                    key={ele.id}
                    transactionDetails={ele}
                    onDeleteTransaction={this.onDeleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
