import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import NavbarFilters from './components/NavbarFilters'
import Home from './components/Home'
import Experiences from './components/Experiences'
import Experience from './components/Experience'
import ExperienceNew from './components/ExperienceNew'
import ExperienceEdit from './components/ExperienceEdit'


const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Navbar} />
        <Route exact path='/experiences/:id' component={Navbar} />
        <Route exact path='/experiences' component={NavbarFilters} />
      </Switch>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/experiences' component={Experiences} />
        <Route exact path='/experiences/new' component={ExperienceNew} />
        <Route exact path='/experiences/:id' component={Experience} />
        <Route exact path="/experiences/:id/edit" component={ExperienceEdit}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App