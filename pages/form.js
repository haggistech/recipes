import React, { useState } from 'react'

export default () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })

  const [inputs, setInputs] = useState({
    title: '',
    shortdescription: '',
    fulldescription: '',
    mainingred: '',
    totaltime: '',
    ingredients: '',
    mealtype: ''
  })

  const handleResponse = (status, msg) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      })
      setInputs({
        title: '',
        shortdescription: '',
        fulldescription: '',
        mainingred: '',
        totaltime: '',
        ingredients: '',
        mealtype: ''
      })
    } else {
      setStatus({
        info: { error: true, msg: msg }
      })
    }
  }

  const handleOnChange = e => {
    e.persist()
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null }
    })
  }

  const handleOnSubmit = async e => {
    e.preventDefault()
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
    const text = await res.text()
    handleResponse(res.status, text)
  }

  return (
    <main>
      <form onSubmit={handleOnSubmit}>
      <label htmlFor="title">Recipe Name</label>
<input
    id="title"
    type="title"
    onChange={handleOnChange}
    required
/>

<label htmlFor="shortdescription">Short Description</label>
<textarea
    id="shortdescription"
    onChange={handleOnChange}
    required
/>

<label htmlFor="fulldescription">Full Description</label>
<textarea
    id="fulldescription"
    onChange={handleOnChange}
    required
/>

<label htmlFor="mainingred">Main Ingredient</label>
<select 
    name="mainingred" 
    id="mainingred"
    onChange={handleOnChange}
    required>
<option value="Chicken">Chicken</option>
<option value="Beef">Beef</option>
<option value="Pork">Pork</option>
</select>

<label htmlFor="totaltime">Total Time (hrs)</label>
<input
    id="totaltime"
    type="totaltime"
    onChange={handleOnChange}
    required
/>

<label htmlFor="ingredients">Ingredients</label>
<textarea
    id="ingredients"
    onChange={handleOnChange}
    required
/>

<label htmlFor="mealtype">Meal Type</label>
<select 
    name="mealtype" 
    id="mealtype"
    onChange={handleOnChange}
    required>
<option value="Breakfast">Breakfast</option>
<option value="Lunch">Lunch</option>
<option value="Dinner">Dinner</option>
</select>
        <button type="submit" disabled={status.submitting}>
          {!status.submitting
            ? !status.submitted
              ? 'Submit'
              : 'Submitted'
            : 'Submitting...'}
        </button>
      </form>
      {status.info.error && (
        <div className="error">Error: {status.info.msg}</div>
      )}
      {!status.info.error && status.info.msg && (
        <div className="success">{status.info.msg}</div>
      )}
    </main>
  )
}