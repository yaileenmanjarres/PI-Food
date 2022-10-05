import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeById } from '../../redux/actions/actions'
import './information.css'
import { useEffect } from 'react';

function Modal() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const selectedRecipe = useSelector(state => state.selectedRecipe)

  useEffect(() => {
    dispatch(getRecipeById(id))
  }, [JSON.stringify(selectedRecipe), id, dispatch])

  return (

    <div className='opacity-information'>
      <div className='information'>

        <div className='title-detail'> {selectedRecipe.name}

        </div>
        <Link to={'/explore'}>
          <span id='close-icon'> 
            ✖
          </span>
        </Link>
        <div className='image-detail'>

        </div>
        <div className='diets-detail'> 

        </div>


      </div>

    </div>

  )
}

export default Modal;
