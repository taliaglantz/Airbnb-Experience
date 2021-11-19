import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
// import NavbarFilters from './components/NavbarFilters'
import Home from './components/Home'
import Experiences from './components/Experiences'
import Experience from './components/Experience'
import ExperienceNew from './components/ExperienceNew'
import ExperienceEdit from './components/ExperienceEdit'
import UserPage from './components/UserPage'


const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/experiences' component={Experiences} />
        <Route exact path='/experiences/experience/new' component={ExperienceNew} />
        <Route exact path='/experiences/experience/:id' component={Experience} />
        <Route exact path="/experiences/experience/:id/edit" component={ExperienceEdit}/>
        <Route exact path="/profile" component={UserPage}/>

      </Switch>
    </BrowserRouter>
  )
}

export default App