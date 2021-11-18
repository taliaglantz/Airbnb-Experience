import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
// import NavbarFilters from './components/NavbarFilters'
import Home from './components/Home'
import Experiences from './components/Experiences'
import Experience from './components/Experience'
import ExperienceNew from './components/ExperienceNew'
import ExperienceEdit from './components/ExperienceEdit'
import RegisterDraft from './components/RegisterDraft'
import LoginDraft from './components/LoginDraft'


const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/experiences' component={Experiences} />
        <Route exact path='/experiences/new' component={ExperienceNew} />
        <Route exact path='/experiences/:id' component={Experience} />
        <Route exact path="/experiences/:id/edit" component={ExperienceEdit}/>
        <Route exact path="/register" component={RegisterDraft}/>
        <Route exact path="/login" component={LoginDraft}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App