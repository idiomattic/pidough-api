import React, {useState} from "react";
import { withRouter } from "react-router";
// import UserNavContainer from "../user_nav/user_nav_container";

const RecipeForm = props => {
  let {author} = props

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [whichFerment, setWhichFerment] = useState('yeast')

  const [numPizzas, setNumPizzas] = useState(null)
  const [pizzaSize, setPizzaSize] = useState(null)
  const [crustThickness, setCrustThickness] = useState('thin')

  const [fermentData, setFermentData] = useState({})
  const [bulkData, setBulkData] = useState({})
  const [extraData, setExtraData] = useState({})
  
  const [extraInputFields, setExtraInputFields] = useState([])

  const addExtraInputField = () => {
    if (extraInputFields.length < 4) {
      setExtraInputFields([...extraInputFields, {idx: (extraInputFields.length), extraName: '', extraQuantity: '', preferment: false}])
    } else {
      console.log('too many extras')
    }
  }

  const removeExtraInputField = idx => {
    const inputs = [...extraInputFields]
    const deleteIdx = inputs.findIndex(input => input.idx === idx)
    const inputObjNameKey = `extra${deleteIdx}Name`
    const inputObjQuantityKey = `extra${deleteIdx}Quantity`
    const newExtraData = Object.assign({}, extraData)
    delete newExtraData[inputObjNameKey]
    delete newExtraData[inputObjQuantityKey]
    setExtraData(newExtraData)
    inputs.splice(deleteIdx, 1)
    setExtraInputFields([...inputs])
  }
  
  const handleErrors = () => {
    return(
      <ul className='recipe error-list'>
        {props.errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    )
  }
  
  const allowSubmit = () => {
    if (title.length > 0 && (Object.keys(fermentData).length > 0) && (Object.keys(bulkData).length > 0)) {
      return <input type="submit" form='recipe-form' className='publish' value='Publish' />
    } else {
      return <input type="submit" form='story-form' className='disabled publish' value='Publish' disabled/>
    }
  }

  const buildData = doughFactor => {
    const unitFermentData = {}
    const unitBulkData = {}
    const unitExtraData = {}
    const dataSets = [fermentData, bulkData, extraData]
    dataSets.forEach((dataSet, idx) => {
      let dataSetKeys = Object.keys(dataSet)
      let respectiveUnitData = [unitFermentData, unitBulkData, unitExtraData][idx]
      dataSetKeys.forEach((key) => {
        let currentValue = dataSet[key]
        if (!isNaN(parseFloat(currentValue))) {
          if (key == 'yeastQuantity') {
            respectiveUnitData[key] = parseFloat(currentValue) / doughFactor
          } else {
            respectiveUnitData[key] = parseFloat(currentValue) / doughFactor
          }
        } else {
          respectiveUnitData[key] = currentValue
        }
      })
    })
    return ({
      ferment: unitFermentData,
      bulk: unitBulkData,
      extra: unitExtraData
    })
  }     

  const handleSubmit = e => {
    e.preventDefault()
    /* DOUGH FACTOR 
      foolproof pan: 697g --> 2x 10" --> 157 in^2 --> 0.225 in^2/g
      my poolish dough: 311g --> 1x 14" --> 154 in^2 --> 0.495 in^2/g
      thick crust take 2.2x as much dough mass to cover a given area
      will increase dough factor so unit measurements are smaller
    */
    const pizzaDimensions = pizzaSize.match(/\d+\.\d+|\d+/g)
    let pizzaArea
    let pizzaSizeString
    let pie
    if (pizzaDimensions.length === 1) {
      pizzaArea = Math.pow((parseFloat(pizzaDimensions[0]) / 2), 2) * Math.PI
      pizzaSizeString = `${pizzaDimensions[0]}-inch`
      pie = 'pie'
    } else {
      pizzaArea = parseFloat(pizzaDimensions[0]) * parseFloat(pizzaDimensions[1])
      pizzaSizeString = `${pizzaDimensions[0]}-inch by ${pizzaDimensions[1]}-inch`
      pie = 'pies'
    }
    const doughFactor = parseInt(numPizzas) * pizzaArea * (crustThickness === 'thin' ? 1 : 2.2)
    props.action({
      author_id: author.id,
      title,
      body,
      original_proportion: `This recipe was originally made for ${numPizzas} ${pizzaSizeString} ${crustThickness}-crust ${pie}.`,
      data: buildData(doughFactor)
    })
      .then(res => props.history.push(`/recipes/${res.recipe.id}`))
  }

  const updateFerment = fermentOption => {
    setFermentData({})
    setWhichFerment(fermentOption)
  }

  const fermentedInputs = () => {
    if (!whichFerment) {return null}
    let formFermentContent
    if (whichFerment === 'yeast') {
      formFermentContent = (
        <label id='yeast'>Instant Yeast
          <input type="number" step="0.1" className='ferment-input' form='recipe-form' onChange={update('ferment', 'yeastQuantity')}/>
        </label>
      )
    } else if (whichFerment === 'preferment') {
      formFermentContent = (
        <div className='preferment-options'>
          <label>
            <input type="text" placeholder="Flour" onChange={update('ferment', 'flourType')}/>
            <input type="number" onChange={update('ferment', 'flourQuantity')}/>
          </label>
          <br />
          <label>Water
            <input type="number" onChange={update('ferment', 'waterQuantity')}/>
          </label>
          <br />
          <label>Yeast
            <input type="number" step="0.1" onChange={update('ferment', 'yeastQuantity')}/>
          </label>
          <br />
        </div>
      )
    } else if (whichFerment === 'sourdough') {
      formFermentContent = (
        <div>
          <label>Hydration Percentage (%)
            <input type="number" min="1" max="100" id="sourdough-hydration-percent" onChange={update('ferment', 'sourdoughHydration')}/>
          </label>
          <br />
          <label>Mass (grams)
            <input type="number" id="sourdough-mass" onChange={update('ferment', 'sourdoughQuantity')}/>
          </label>
        </div>
      )
    }
    return (
      <div className="preferment-content">
        {formFermentContent}
        {mapRespectiveExtraItems('preferment')}
      </div>
    )
  }

  const updateExtraInputPos = (pos, input) => {
    const newInputFields = [...extraInputFields]
    let newInput = Object.assign({}, extraInputFields[input.idx])
    newInput['preferment'] = (pos === 'preferment')
    newInputFields[input.idx] = newInput
    let dataNameKey = 'extra' + input.idx + 'Name'
    let dataQuantityKey = 'extra' + input.idx + 'Quantity'
    if (pos === 'preferment') {
      setFermentData(Object.assign(fermentData, {[dataNameKey]: extraData[dataNameKey]}))
      setFermentData(Object.assign(fermentData, {[dataQuantityKey]: extraData[dataQuantityKey]}))
      let newExtraData = Object.assign({}, extraData)
      delete newExtraData[dataNameKey]
      delete newExtraData[dataQuantityKey]
      setExtraData(newExtraData)
    } else if (pos === 'bulk') {
      setExtraData(Object.assign(extraData, {[dataNameKey]: fermentData[dataNameKey]}))
      setExtraData(Object.assign(extraData, {[dataQuantityKey]: fermentData[dataQuantityKey]}))
      let newFermentData = Object.assign({}, fermentData)
      delete newFermentData[dataNameKey]
      delete newFermentData[dataQuantityKey]
      setFermentData(newFermentData)
    }    
    setExtraInputFields(newInputFields)
  }

  const update = (section, field, input) => {
    return e => {
      let parsedInt = parseInt(e.target.value)
      let userInput = isNaN(parsedInt) ?
        e.target.value
        : (parsedInt === 0 ? parseFloat(e.target.value) : parsedInt)
      if (section === 'title') {
        setTitle(userInput)
      } else if (section === 'body') {
        setBody(userInput)
      } else if (section === 'ferment') {
        setFermentData(Object.assign(fermentData, { [field]: userInput }))
      } else if (section === 'bulk') {
        setBulkData(Object.assign(bulkData, { [field]: userInput }))
      } else if (section === 'extra') {
        setExtraData(Object.assign(extraData, { [field]: userInput }))
        const newInputFields = [...extraInputFields]
        let newInput = Object.assign({}, extraInputFields[input.idx])
        if (field.charAt(6) === 'N') {
          newInput['extraName'] = userInput
          newInputFields[input.idx] = newInput
          setExtraInputFields(newInputFields)
        } else {
          newInput['extraQuantity'] = userInput
          newInputFields[input.idx] = newInput
          setExtraInputFields(newInputFields)
        }
      }      
    }
  }

  const updateNumPizzas = () => {
    return e => {
      setNumPizzas(parseInt(e.target.value))
    }
  }

  const updatePizzaSize = () => {
    return e => {
      setPizzaSize(e.target.value)
    }
  }

  const updateThickness = () => {
    return e => {
      setCrustThickness(e.target.value)
    }
  }

  const mapRespectiveExtraItems = section => {
    return (extraInputFields
      .map((input, i) => Object.assign(input, { originalIndex: i }))
      .filter(input => section === 'preferment' ? input.preferment : !input.preferment)
      .map((input, i) => {
        let switchSectionButton = (section === 'preferment')
          ? <label>Bulk
              <input className='extra-type-radios' type="radio" name={"extra" + input.originalIndex + "-type-choice"} defaultChecked={section === 'bulk'} onChange={() => updateExtraInputPos('bulk', input)}/>
            </label>
          : <label>Preferment
              <input className='extra-type-radios' type="radio" name={"extra" + input.originalIndex + "-type-choice"} defaultChecked={section === 'preferment'} onChange={() => updateExtraInputPos('preferment', input)} />
            </label>
        return (
          <div className='extra-input' key={i}>
            <input type="text"
              placeholder='Olive Oil, Sugar, etc.'
              onChange={update('extra', `extra${i}Name`, input)}
              value={extraInputFields[input.originalIndex]['extraName']}
              />
            <input type="number"
              onChange={update('extra', `extra${i}Quantity`, input)}
              value={extraInputFields[input.originalIndex]['extraQuantity']}
              />
            <div className='extra-type-choices'>
              {switchSectionButton}
            </div>
            <h3 onClick={() => removeExtraInputField(input.idx)} className="remove-input-button">-</h3>
            <br />
          </div>
      )}))
  }

  let pizzasString = numPizzas > 1 ? 'pizzas' : 'pizza' 

  return(
    <div className='recipe-form-div'>
      {handleErrors()}
      <form className='recipe-form' onSubmit={handleSubmit} id='recipe-form'>
        <input className={ title.length > 1 ? 'recipe-title' : 'recipe-title required' }
          type="text" 
          value={title} 
          onChange={update('title')} 
          placeholder="Title" />
        <br />
        <div className='ferment-choices'>
          <label>Instant Yeast
            <input type="radio" name="ferment-choice" defaultChecked onChange={() => updateFerment('yeast')}/>
          </label>
          <label>Preferment (Poolish, Biga, etc.)
            <input type="radio" name="ferment-choice" onChange={() => updateFerment('preferment')}/>
          </label>
          <label>Sourdough Starter
            <input type="radio" name="ferment-choice" onChange={() => updateFerment('sourdough')}/>
          </label>
        </div>
        {fermentedInputs()}
        <br />
        <div className='bulk'>
          <label>
            <input type="text" placeholder="Flour" onChange={update('bulk', 'flourType')}/>
            <input type="number" onChange={update('bulk', 'flourQuantity')} className={ bulkData['flourQuantity'] ? '' : 'required' }/>
          </label>
          <br />
          <label>Water
            <input type="number" onChange={update('bulk', 'waterQuantity')} className={ bulkData['waterQuantity'] ? '' : 'required' } />
          </label>
          <br />
          <label>Salt
            <input type="number" onChange={update('bulk', 'saltQuantity')} />
          </label>
          <br />
        </div>
        <br />
        <div className='extra-inputs-container'>
          {mapRespectiveExtraItems('bulk')}
          <h3 onClick={addExtraInputField} className='add-input-button'>+</h3>
        </div>
        <div className='portions-section'>
          <h3>This makes </h3>
          <input type="number" id='number-of-portions' onChange={updateNumPizzas()} placeholder="3" className={ numPizzas ? '' : 'required' } />
          <input type="text" id='size' onChange={updatePizzaSize()} placeholder="14&quot; or 10&quot;x14&quot; " className={ pizzaSize ? '' : 'required' } />
          <h3>{` ${pizzasString} with `}</h3>
          <select id='thiccness' onChange={updateThickness()}>
            <option value="thin" >thin</option>
            <option value="thick" >thick</option>
          </select>
          <h3> crust.</h3>
        </div>
        <br />
      </form>
      <textarea form='recipe-form'
        type='text'
        value={body}
        onChange={update('body')}
        className='recipe-body'
        placeholder="Share your method..." />
      <br />
      {allowSubmit()}
    </div>
  )
}

export default withRouter(RecipeForm)
