import './form.css'

function Form() {

  return (
    <div className='form-container form-container-hidden' >
      <div id='opacity' />
      <div className='removable'>
        <div id='form'>
          <div id='title'>
            <span >
              Create activity
            </span>
            <span id='close-icon'>
              ✖
            </span>
          </div>
          <form>
            <label> Name:</label>
            <input type="text" />

            <label>Difficulty:</label>
            <input type="number" max={5} min={1} />

            <label>Duration:</label>
            <input type="number" min={0} />

            <label>Season:</label>
            <input type="text" />
          </form >
          <button id='save-button'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Form;
