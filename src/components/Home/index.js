import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'

export default class Home extends Component {
  state = {list: [], loader: true}

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    console.log(response)
    const respData = await response.json()
    console.log(respData.packages)
    if (response.ok) {
      const data = respData.packages.map(each => ({
        id: each.id,
        description: each.description,
        imageUrl: each.image_url,
        name: each.name,
      }))
      console.log(data)
      this.setState({list: data, loader: false})
    } else {
      this.setState({loader: true})
    }
  }

  render() {
    const {list, loader} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Travel Guide</h1>
        {loader ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul>
            {list.map(each => (
              <li key={each.id}>
                <img className="img" src={each.imageUrl} alt={each.name} />
                <h1 className="name">{each.name}</h1>
                <p>{each.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
