import React from "react"
import { withRouter } from "react-router"

class RecipeShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    const doughFactor = parseInt(numPizzas) * pizzaArea * (crustThickness === 'thin' ? 1 : (crustThickness === 'thick-ish' ? 1.6 : 2.2))
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
      // let yeastKeyIdx
      // dataSetKeys.forEach((key, i) => {
      for (let i=0; i< dataSetKeys.length; i += 0) {
        let key = dataSetKeys[i]
        let currentValue = dataSet[key]
        if (!isNaN(parseFloat(currentValue))) {
          if (key === 'yeastQuantity') {
            respectiveScaledData[key] = parseFloat(parseFloat(currentValue) * doughFactor)
          } else {
            respectiveScaledData[key] = parseInt(parseFloat(currentValue) * doughFactor)
          }
          i += 1
        } else if (currentValue.match(/yeast|Yeast/)) {
          respectiveScaledData[key] = currentValue
          let yeastQuantityIdx = i + 1
          let yeastVal = dataSet[dataSetKeys[yeastQuantityIdx]]
          respectiveScaledData[dataSetKeys[yeastQuantityIdx]] = parseFloat(parseFloat(yeastVal) * doughFactor)
          i += 2
        }
        else {
          respectiveScaledData[key] = currentValue
          i += 1
        }
      }
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
      .then(res => {
        this.updateRecipeAmounts(res.recipe.data)
        this.setState({ unitRecipeData: res.recipe.data })
      },
        err => history.push('/feed'))
  }

  changeKeyName(key) {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  renderRecipeData() {
    let {recipeData} = this.state
    let ferment = recipeData?.ferment || {}
    let bulk = recipeData?.bulk || {}
    let extra = recipeData?.extra || {}
    let fermentData = Object.keys(ferment).length === 0
      ? null
      : <div className="pt-2 border-t-2 border-dotted border-yellow-900"> 
          <h3 className="font-semibold">Ferment</h3>
          <ul className="pb-2 mb-2 border-b-2 border-dotted border-yellow-900">
              {Object.keys(ferment).map((key, i) => {
                let nextKey = Object.keys(ferment)[i + 1]
                let val
                if (key.charAt(6) === 'N' && key.charAt(0) === 'e') {
                  if (parseFloat(ferment[nextKey])) {
                    val = Math.round(ferment[nextKey] * 10) / 10 + ' g'
                  } else {
                    val = ferment[nextKey]
                  }
                  return (
                    <li key={i}>
                      <div className="w-full grid grid-cols-2">
                        <p>{this.changeKeyName(ferment[key])}</p>
                        <p>{val}</p>
                      </div>
                    </li>
                  )
                } else if (key.charAt(6) !== "Q") {
                  if (parseFloat(ferment[key])) {
                    val = Math.round(ferment[key] * 10) / 10 + ' g'
                  } else {
                    val = ferment[key]
                  }
                  return (
                    <li key={i}>
                      <div className="w-full grid grid-cols-2">
                        <p>{this.changeKeyName(key)}:</p>
                        <p>{val}</p>
                      </div>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
    let bulkData = Object.keys(bulk).length === 0
      ? null
      : <div>
          <h3 className="font-semibold">Bulk</h3>
          <ul>
              {Object.keys(bulk).map((key, i) => {
                let val
                if (parseFloat(bulk[key])) {
                  val = Math.round(bulk[key] * 10) / 10 + ' g'
                } else {
                  val = bulk[key]
                }
                return (
                <li key={i}>
                    <div className="w-full grid grid-cols-2">
                      <p>{this.changeKeyName(key)}:</p>
                      <p>{val}</p>
                    </div>
                </li>
              )})}
            </ul>
        </div>
    let extraData = Object.keys(extra).length === 0
      ? null
      : <div>
          <ul>
              {Object.keys(extra).map((key, i) => {
                let nextKey = Object.keys(extra)[i + 1]
                let val
                if (key.charAt(6) === 'N') {
                  if (parseFloat(extra[nextKey])) {
                    val = Math.round(extra[nextKey] * 10) / 10 + ' g'
                  } else {
                    val = extra[nextKey]
                  }
                  return (
                    <li key={i}>
                      <div className="w-full grid grid-cols-2">
                        <p>{this.changeKeyName(extra[key])}</p>
                        <p>{val}</p>
                      </div>
                    </li>
                  )
                }
              })}
            </ul>
        </div> 
    
    return <div className="max-w-full">
      {fermentData}
      {bulkData}
      {extraData}
    </div>
  }

  deleteAndRedirect(recipeId) {
    let { deleteRecipe, history } = this.props
    deleteRecipe(recipeId)
      .then(history.push('/'))
  }

  recipeNav() { // dlete button for owner, and bookmark button eventually
    let { currentUser, recipe } = this.props
    let deleteButton = currentUser.id !== recipe.authorId ? null
      : <span className="cursor-pointer font-light text-gray-600 hover:text-red-700 hover:font-bold"
          onClick={() => this.deleteAndRedirect(recipe._id)} >Delete</span> 
    return (<div className="flex items-center justify-between">
      {deleteButton}
    </div>)
  }
  
  render() {
    let { recipe } = this.props
    if (!recipe || !recipe.authorId) {
      return null
    }
    let pizzasString = this.state.numPizzas > 1 ? 'pizzas' : 'pizza'
    return(
      <div className='w-full mx-auto px-4'>
        <div className="mt-7 bg-white max-w-2xl px-4 mx-auto border-2 border-yellow-900 rounded-sm">
          <div className='flex items-center justify-between'>
            <h2 className='mt-2 text-xl font-bold'>{recipe.title}</h2>
            {this.recipeNav()}
          </div>
          <div>{recipe.authorName}</div>
          <p className="my-2 italic">{recipe.originalProportion}</p>
        </div>
        <div className='flex flex-wrap justify-center -mt-4 py-4 -ml-10'>
          <div className="flex flex-col max-w-md justify-between mt-4 mb-2 ml-10 items-center p-4 min-h-[25rem] bg-white border-2 border-yellow-900 rounded-sm">
            <div className='flex flex-wrap items-center font-semibold'>
              <h3 className="mr-2 whitespace-nowrap">I want to make </h3>
              <input type="number"
                onChange={this.update('numPizzas')}
                value={this.state.numPizzas}
                className="px-1 outline-0 w-10 mr-2 border-b-2 border-yellow-900 font-semibold" />
              <input type="text"
                onChange={this.update('pizzaSize')}
                value={this.state.pizzaSize}
                className="px-1 text-center outline-0 w-20 mr-2 border-b-2 border-yellow-900 font-semibold" />
              <h3>{` ${pizzasString} with `}</h3>
              <select className="font-semibold" onChange={this.update('crustThickness')}>
                <option value="thin" >thin</option>
                <option value="thick-ish" >thick-ish</option>
                <option value="thick" >thick</option>
              </select>
              <h3> crust.</h3>
            </div>
            <div className="w-full">
              {this.renderRecipeData()}
            </div>
          </div>
          <div className="bg-white min-h-[25rem] p-4 max-w-md w-full mt-4 mb-2 ml-10 border-2 border-yellow-900 rounded-sm">
            <pre className='w-full h-full whitespace-pre-wrap font-[inherit]'>{recipe.body}</pre>
          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(RecipeShow)