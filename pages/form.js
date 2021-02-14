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
    preptime: '',
    ingredients: '',
    mealtype: '',
    method: ''
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
        preptime: '',
        ingredients: '',
        mealtype: '',
        method: ''
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
    const res = await fetch('/api/sendToDatabase', {
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
      <center><h2>Submit a Recipe</h2></center><br />
      <form onSubmit={handleOnSubmit}>
      <label htmlFor="title">Recipe Name</label>
<input
    id="title"
    type="title"
    onChange={handleOnChange}
    required
/>

<label htmlFor="description">Short Description</label>
<textarea
    id="description"
    onChange={handleOnChange}
    required
/>

<label htmlFor="mainingred">Main Ingredient</label>
<input
    id="mainingred"
    type="mainingred"
    onChange={handleOnChange}
    required
/>

<label htmlFor="preptime">Prep Time</label>
<input
    id="preptime"
    type="preptime"
    onChange={handleOnChange}
    required
/>

<label htmlFor="cooktime">Cook Time</label>
<input
    id="cooktime"
    type="cooktime"
    onChange={handleOnChange}
    required
/>

<label htmlFor="difficulty">Difficulty</label>
<input
    id="difficulty"
    type="difficulty"
    onChange={handleOnChange}
    required
/>

<label htmlFor="ingredients">Ingredients</label>
<textarea
    id="ingredients"
    onChange={handleOnChange}
    required
/>

<label htmlFor="method">Method</label>
<textarea
    id="method"
    onChange={handleOnChange}
    required
/>

<label htmlFor="mealtype">Meal Type</label>
<input
    id="mealtype"
    type="mealtype"
    onChange={handleOnChange}
    required
/>
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