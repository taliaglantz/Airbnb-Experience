import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
// import NavbarFilters from './components/NavbarFilters'
import Home from './components/Home'
import Experiences from './components/Experiences'
import Experience from './components/Experience'
import ExperiencesMap from './components/ExperiencesMap'


const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/experiences' component={Experiences} />
        <Route exact path='/experiences/:id' component={Experience} />
        <Route exact path='/experiences-map' component={ExperiencesMap} />
      </Switch>
    </BrowserRouter>
  )
}

export default App