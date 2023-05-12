import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

export default class MainContainer extends Component {
  state = {
    listOfData: [],
    apiStatus: 'LOADING',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.packages)

    const list = data.packages.map(o => ({
      id: o.id,
      name: o.name,
      description: o.description,
      imageUrl: o.image_url,
    }))
    this.setState({
      listOfData: list,
      apiStatus: '',
    })
  }

  render() {
    const {listOfData, apiStatus} = this.state

    return (
      <div className="bg-container">
        <h1 className="main-heading">Travel Guide</h1>
        {apiStatus === 'LOADING' ? (
          <div className="loader" data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="list-items-container">
            {listOfData.map(item => (
              <li className="card-item" key={item.id}>
                <img className="image" alt={item.name} src={item.imageUrl} />
                <h1 className="heading">{item.name}</h1>
                <p className="para">{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
