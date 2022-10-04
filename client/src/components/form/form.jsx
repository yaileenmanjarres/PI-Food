import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showCreateRecipes, postCreateRecipe } from '../../redux/actions/actions'
import './form.css'

const template = {
  step: 'Description',
  ingredients: [{ name: 'Ingredients separed by comma' }]
}

function Form() {
  const dispatch = useDispatch()
  const allDiets = useSelector(state => state.diets)
  const [newSteps, setNewSteps] = useState([])
  const [fields, setFields] = useState({
    type: 'db',
    name: '',
    summary: '',
    healthScore: 0,
    steps: [],
    diets: []
  })

  const addStep = (event) => {
    event.preventDefault()
    setNewSteps(state => state.concat([template]))
  }

  const handleFormChange = (event) => {
    const property = event.target.id
    if (['name', 'summary', 'healthScore'].includes(property)) {
      setFields(state => ({
        ...state,
        [property]: property === 'healthScore' ? parseInt(event.target.value) : event.target.value
      }))
    } else if (property === 'diets') {
      const dietExist = fields.diets.find(diet => diet.name === event.target.value)
      if (dietExist) {
        const filteredDiets = fields.diets.filter(diet => diet.name !== event.target.value)
        setFields(state => ({
          ...state,
          diets: filteredDiets
        }))
      } else {
        const dietToAdd = allDiets.filter(diet => diet.name === event.target.value)
        const currentDiets = fields.diets
        const concatDiet = currentDiets.concat(dietToAdd)
        setFields(state => ({
          ...state,
          diets: concatDiet
        }))
      }
    }
  }

  const disableSaveButton = () => {
    return (
      fields.name.length > 0 &&
      fields.summary.length > 0 &&
      fields.healthScore > 0 &&
      fields.diets.length > 0 &&
      newSteps.length > 0
    )
  }

  const onSave = () => {
    dispatch(postCreateRecipe(fields))
    dispatch(showCreateRecipes(false))
  }

  return (
    <div className='form-container form-container-hidden' >
      <div id='opacity' />
      <div className='removable'>
        <div id='form'>
          <div id='form-title'>
            <span >
              Create Recipe
            </span>
            <span id='close-icon' onClick={() => dispatch(showCreateRecipes(false))}>
              ✖
            </span>
          </div>

          <form onChange={handleFormChange}>
            <div className="label-validation">
              <label> Name:</label>
              {
                fields.name.length === 0 ? <span className="validation-msg">required name</span> : null
              }
            </div>
            <input type="text" id='name' />

            <div className="label-validation">
              <label>Summary:</label>
              {
                fields.summary.length === 0 ? <span className="validation-msg">required summary</span> : null
              }
            </div>
            <textarea rows={5} className='textarea' id="summary" />

            <div className="label-validation">
              <label>Health score:</label>
              {
                fields.healthScore === 0 ? <span className="validation-msg">required health score</span> : null
              }
            </div>
            <input type="number" max={100} min={1} id='healthScore' />

            <div className="label-validation">
              <label>Steps:</label>
              {
                newSteps.length === 0 ? <span className="validation-msg">add at least 1 step</span> : null
              }
            </div>
            <div className="steps-container">
              {
                newSteps.map((newStep, index) => (
                  <div className="recipe-step" key={index}>
                    <label className="step-title">Step {index + 1}</label>
                    <textarea className="step-input textarea" rows={2} placeholder={newStep.step} />
                    <input className="step-input" type="text" placeholder={newStep.ingredients.map(item => item.name)} />
                  </div>
                ))
              }
              <div>
                <button onClick={addStep}>
                  Add Step
                </button>
              </div>
            </div>

            <div className="label-validation">
              <label>Diets:</label>
              {
                fields.diets.length === 0 ? <span className="validation-msg">choose at least 1 diet</span> : null
              }
            </div>
            <div className='diet-selector'>
              {
                allDiets.map(diet => (
                  <span key={diet.id} >
                    <input type="checkbox" id="diets" value={diet.name} />
                    <label>{diet.name}</label>
                  </span>
                ))
              }
            </div>
          </form >
          <button id='save-button' className={`${!disableSaveButton() ? 'button-disabled' : ''}`} onClick={onSave} disabled={!disableSaveButton()}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Form;
