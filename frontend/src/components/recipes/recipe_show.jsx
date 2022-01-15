import React from "react"
import { withRouter } from "react-router"

class RecipeShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likeCount: this.props.likeCount,
      like: {
        liker_id: props.currentUser.id,
        recipe_id: props.recipeId
      },
      doughFactor: 113.1,
      numPizzas: 1,
      pizzaSize: '12"',
      crustThickness: 'thin',
      unitRecipeData: null,
      recipeData: null
    }
    this.update = this.update.bind(this)
  }

  updateDoughFactor() {
    let {numPizzas, pizzaSize, crustThickness} = this.state
    const pizzaDimensions = pizzaSize.match(/\d+\.\d+|\d+/g)
    const pizzaArea = pizzaDimensions.length === 1 ? (Math.pow((parseFloat(pizzaDimensions[0]) / 2), 2) * Math.PI) : parseFloat(pizzaDimensions[0]) * parseFloat(pizzaDimensions[1])
    const doughFactor = parseInt(numPizzas) * pizzaArea * (crustThickness === 'thin' ? 1 : 2.2)
    this.setState({ doughFactor }, res => this.updateRecipeAmounts())
  }

  update(sizeAttribute) {
    return e => {
      this.setState({
        [sizeAttribute]: e.target.value
      }, res => this.updateDoughFactor())
    }
  }

  updateRecipeAmounts(data) {
    let recipeData
    if (this.state.unitRecipeData) {
      recipeData = this.state.unitRecipeData
    } else if (data) {
      recipeData = data
    }

    let fermentData = recipeData['ferment'] || {}
    let bulkData = recipeData['bulk'] || {}
    let extraData = recipeData['extra'] || {}
    let {doughFactor} = this.state
    const scaledFermentData = {}
    const scaledBulkData = {}
    const scaledExtraData = {}
    const dataSets = [fermentData, bulkData, extraData]
    dataSets.forEach((dataSet, idx) => {
      let dataSetKeys = Object.keys(dataSet)
      let respectiveScaledData = [scaledFermentData, scaledBulkData, scaledExtraData][idx] // keying into object
      dataSetKeys.forEach((key) => {
        let currentValue = dataSet[key]
        if (!isNaN(parseFloat(currentValue))) {
          if (key == 'yeastQuantity') {
            respectiveScaledData[key] = parseFloat(parseFloat(currentValue) * doughFactor)
          } else {
            respectiveScaledData[key] = parseInt(parseFloat(currentValue) * doughFactor)
          }
        } else {
          respectiveScaledData[key] = currentValue
        }
      })
    })
    this.setState({
      recipeData: {
        ferment: scaledFermentData,
        bulk: scaledBulkData,
        extra: scaledExtraData
      }
    })
  }

  componentDidMount() {
    let {recipeId, recipe, getRecipe, history} = this.props
    getRecipe(recipeId)
      .then(res => {this.updateRecipeAmounts(res.recipe.data)
        this.setState({ unitRecipeData: res.recipe.data })
        this.setLikeCount()
      },
        err => history.push('/feed'))
  }

  renderRecipeData() {
    let {recipeData} = this.state
    return JSON.stringify(recipeData)
  }
  
  render() {
    let { recipe } = this.props
    if (!recipe || !recipe.author) {
      return null
    }
    let pizzasString = this.state.numPizzas > 1 ? 'pizzas' : 'pizza' 
    return(
      <div className='recipe-show'>
        <div className='title-wrapper'>
          <h2 className='recipe-title'>{recipe.title}</h2>
          {this.isOwner()}
        </div>
        <br />
        <div className='recipe-info'>
          <div className='author' onClick={() => this.redirectToShow(recipe.authorId)}>{recipe.author.username}</div>
          <br />
          <p className="original-proportions">{recipe.originalProportion}</p>
        </div>
        <br />
        <p className='recipe-body'>{recipe.body}</p>
        <br />
        <div className='show portions-section'>
          <h3>I want to make </h3>
          <input type="number" id='number-of-portions' onChange={this.update('numPizzas')} value={this.state.numPizzas} />
          <input type="text" id='size' onChange={this.update('pizzaSize')} value={this.state.pizzaSize} />
          <h3>{` ${pizzasString} with `}</h3>
          <select id='thiccness' onChange={this.update('crustThickness')}>
            <option value="thin" >thin</option>
            <option value="thick" >thick</option>
          </select>
          <h3> crust.</h3>
        </div>
        <br />
        <div className="data-section">
          {this.renderRecipeData()}
        </div>
        <br />
        {/* <div className='recipe-footer'>
          <div className='left-buttons'>
            <div className='comment-nav'>
              <FontAwesomeIcon icon={faComment} onClick={() => this.showCommentsModal()}/>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

export default withRouter(RecipeShow)