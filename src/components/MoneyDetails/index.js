import './index.css'

const MoneyDetails = props => {
  const {typeDetails} = props
  const {
    imageUrl,
    displayText,
    imageAltText,
    cname,
    Amount,
    dTestId,
  } = typeDetails
  return (
    <li className={`${cname} list-item1`}>
      <div>
        <img className="image-type" src={imageUrl} alt={imageAltText} />
      </div>
      <div>
        <p className="account-type">{displayText}</p>
        <p data-testid={dTestId} className="amount-detail">
          Rs {Amount}
        </p>
      </div>
    </li>
  )
}
export default MoneyDetails
