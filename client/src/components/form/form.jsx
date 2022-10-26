import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postCreateRecipe } from '../../redux/actions/actions'
import { Link, useHistory } from "react-router-dom"
import './form.css'

const template = {
  step: 'Description',
  ingredients: [{ name: 'Ingredients separed by comma' }]
}

function Form() {
  const history = useHistory()
  const dispatch = useDispatch()
  const allDiets = useSelector(state => state.diets)
  const [newSteps, setNewSteps] = useState([template])
  const [disableAddStep, setDisableAddStep] = useState(true)
  const [fields, setFields] = useState({
    type: 'db',
    name: '',
    image: '',
    summary: '',
    healthScore: 0,
    steps: [],
    diets: []
  })

  const addStep = (event) => {
    event.preventDefault()
    setNewSteps(state => state.concat([template]))
  }

  const validateSteps = (event) => {
    if (event && /^\s/g.test(event.target.value)) {
      event.target.value = event.target.value.replace(/^\s+/, '')
      return
    }
    const allStepsTitles = Array.from(document.getElementsByClassName('textarea-step'))
    const stepsFull = allStepsTitles.every(title => title.value.length > 0)
    setDisableAddStep(stepsFull)
  }

  useEffect(() => {
    validateSteps()
  }, [newSteps])

  const pushStepsToFields = () => {
    const allStepsTitles = document.getElementsByClassName('textarea-step')
    const stepsValues = newSteps.map((step, index) => {
      return {
        number: index + 1,
        step: allStepsTitles[index].value
      }
    })
    const fieldsWithSteps = fields
    fieldsWithSteps.steps = stepsValues
    return fieldsWithSteps
  }

  const onSave = (event) => {
    event.preventDefault()
    pushStepsToFields()
    dispatch(postCreateRecipe(pushStepsToFields()))
    setTimeout(() => history.push('/explore'), 300)
  }

  const handleFormChange = (event) => {
    const property = event.target.id
    if (['name', 'image', 'summary', 'healthScore'].includes(property)) {
      if (/^\s/g.test(event.target.value)) {
        event.target.value = event.target.value.replace(/^\s+/, '')
        return
      }
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
      disableAddStep
    )
  }

  return (
    <div className='form-container' >
      <div id='opacity' />
      <div className='removable'>
        <div id='form'>
          <div id='form-title'>
            <span >
              Create Recipe
            </span>
            <Link className='close-link' to={'/explore'}>
              <span >
                ✖
              </span>
            </Link>
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

              <label> Image:</label>
              {
                fields.image.length === 0 ? <span className="validation-msg">required image URL</span> : null
              }
            </div>
            <input type="text" id='image' />

            <div className="label-validation">
              <label>Summary:</label>
              {
                fields.summary.length === 0 ? <span className="validation-msg">required summary</span> : null
              }
            </div>
            <textarea rows={3} className='textarea' id="summary" />

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
                !disableAddStep ? <span className="validation-msg">all steps must be filled</span> : null
              }
            </div>
            <div className="steps-container">
              {
                newSteps.map((newStep, index) => (
                  <div className="recipe-step" key={index}>
                    <label className="step-title">Step {index + 1}</label>
                    <textarea className="step-input textarea textarea-step" rows={2} placeholder={newStep.step} onChange={validateSteps}/>
                  </div>
                ))
              }
              <div>
                <button onClick={addStep} disabled={!disableAddStep}>
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
          <Link to={'/explore'}
            id='save-button'
            className={`${!disableSaveButton() ? 'button-disabled' : ''}`}
            disabled={!disableSaveButton()}
            onClick={onSave}
          >
            Save
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Form;
