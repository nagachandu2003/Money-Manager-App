import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteTransaction} = props
  const {id, title, amount, type} = transactionDetails
  const onDelete = () => {
    onDeleteTransaction(id)
  }
  return (
    <li className="list-item3">
      <p className="parity">{title}</p>
      <p className="parity">Rs {amount}</p>
      <p className="parity">{type}</p>
      <button
        data-testid="delete"
        onClick={onDelete}
        className="delBtn parity"
        type="button"
      >
        <img
          className="delImg"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
