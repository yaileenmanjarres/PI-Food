import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showCreateRecipes, getAllDiets } from '../../redux/actions/actions'
import './form.css'

const template = {
  step: 'Description',
  ingredients: [{ name: 'Ingredients separed by comma' }]
}

function Form() {
  const dispatch = useDispatch()
  const allDiets = useSelector(state => state.diets)
  const [newDiets, setNewDiets] = useState([template])

  const addStep = (event) => {
    event.preventDefault()
    setNewDiets(state  => state.concat([template]))
  }

  console.log(newDiets);
  return (
    <div className='form-container form-container-hidden' >
      <div id='opacity' />
      <div className='removable'>
        <div id='form'>
          <div id='title'>
            <span >
              Create Recipe
            </span>
            <span id='close-icon' onClick={() => dispatch(showCreateRecipes(false))}>
              ✖
            </span>
          </div>
          <form>
            <label> Name:</label>
            <input type="text" />

            <label>Summary:</label>
            <textarea rows={5} />

            <label>Health score:</label>
            <input type="number" max={100} min={0} />

            <label>Steps:</label>
            <div className="steps-container">
              {
                newDiets.map((newDiet, index) => (
                  <div className="recipe-step" key={index}>
                    <label className="step-title">Step {index + 1}</label>
                    <textarea className="step-input" rows={2} placeholder={newDiet.step} />
                    <input className="step-input" type="text" placeholder={newDiet.ingredients.map(item => item.name)} />
                  </div>
                ))
              }
              <div>
                <button onClick={addStep}>
                  +
                </button>
              </div>
            </div>

            <label>Diets:</label>
            <div className='diet-selector'>
              {
                allDiets.map(diet => (
                  <span key={diet.id} >
                    <input type="checkbox" />
                    <label>{diet.name}</label>
                  </span>
                ))
              }
            </div>
          </form >
          <button id='save-button'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Form;
