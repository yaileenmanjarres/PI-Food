import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeById } from '../../redux/actions/actions'
import './modal.css'
import { useEffect } from 'react';

function Modal() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const selectedRecipe = useSelector(state => state.selectedRecipe)
  
  useEffect(() => {
    dispatch(getRecipeById(id))
  }, [id, dispatch])

  const summaryDiv = document.getElementById('summary')

  if (summaryDiv) {
    summaryDiv.innerHTML = selectedRecipe.summary
  }

  return (

    <div className='opacity-modal'>
      <div className='modal'>


        <div className='title-container'>
          <div className='title-detail'> {selectedRecipe.name}
          </div>
          <Link className='close-link' to={'/explore'}>
            <span >
              ✖
            </span>
          </Link>
        </div>


        <div className='modal-container'>
          <div className='container-one'>
            <img alt='' src={selectedRecipe.image} className='image-detail' />
            <div className='diets-detail'> {
              selectedRecipe.diets && selectedRecipe.diets.length > 0 && selectedRecipe.diets.map((diet, index) =>
                <span className={`diet ${selectedRecipe.type === 'api' ? diet.split(' ').join('') : diet.name.split(' ').join('')}`} key={index}>
                  {
                    selectedRecipe.type === 'api' ? diet : diet.name
                  }
                </span>
              )}
            </div>
            <div className='healthScore-detail'>
              <span> 
                <p className='title-healthScore'>Health score:</p>
                <b className='subtitle-healthScore'>{selectedRecipe.healthScore}%</b>
              </span>

            </div>
          </div>


          <div className='container-two' >
            <div className='summary-detail' id='summary'>
            </div>
            <div className='steps-detail'> {
              selectedRecipe.steps && selectedRecipe.steps.length > 0 && selectedRecipe.steps.map((step, index) =>
                <div key={index}>
                  <span>
                    <b>Step {step.number}: </b>
                  </span>
                  <span>
                    {step.step}
                  </span>
                </div>
              )
            }
            </div>
          </div>


        </div>
      </div>

    </div>

  )
}

export default Modal;
