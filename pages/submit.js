import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import React, { useState } from 'react'

export default function Home({ isConnected }) {
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
    const res = await fetch('/api/submit', {
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
    <div className="container">
      <Head>
        <title>Submit a Recipe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>
        Submit a Recipe
        </h2>

        <form className="form-horizontal" onSubmit={handleOnSubmit}>

<div className="form-group">
  <label className="col-md-4 control-label" htmlFor="textinput">Recipe Title</label>  
  <div className="col-md-4">
  <input id="textinput" name="recipename" type="text" className="form-control input-md" value={inputs.recipename} /> 
  </div>
</div>

<div className="form-group">
  <label className="col-md-4 control-label" htmlFor="textinput">Short Description</label>  
  <div className="col-md-4">
  <input id="textinput" name="shortdescription" type="text" className="form-control input-md" value={inputs.shortdescription} /> 
  </div>
</div>

<div className="form-group">
  <label className="col-md-4 control-label" htmlFor="textarea">Full Description</label>
  <div className="col-md-4">                     
    <textarea className="form-control" id="textarea" name="textarea"></textarea>
  </div>
</div>

<div className="form-group">
  <label className="col-md-4 control-label" htmlFor="selectbasic">Main Ingredient</label>
  <div className="col-md-4">
    <select id="selectbasic" name="selectbasic" className="form-control">
      <option value="1">Chicken</option>
      <option value="2">Beef</option>
      <option value="3">Pork</option>
      <option value="4">Veggie</option>
    </select>
  </div>
</div>

<div className="form-group">
  <label className="col-md-4 control-label" htmlFor="selectbasic">Meal Type</label>
  <div className="col-md-4">
    <select id="selectbasic" name="selectbasic" className="form-control">
      <option value="1">Breakfast</option>
      <option value="2">Lunch</option>
      <option value="3">Dinner</option>
      <option value="4">Dessert</option>
      <option value="5">Snack</option>
      <option value="6">Drink</option>
    </select>
  </div>
</div>

<div className="form-group">
  <label className="col-md-4 control-label" htmlFor="button1id">Double Button</label>
  <div className="col-md-8">
    <button id="submit" name="button1id" className="btn btn-success">Submit</button>
    <button id="button2id" name="button2id" className="btn btn-danger">Reset Values</button>
  </div>
</div>


</form>
      </main>

      <footer>

          Powered by {'Mik'}

      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected() // Returns true or false

  return {
    props: { isConnected },
  }
}
