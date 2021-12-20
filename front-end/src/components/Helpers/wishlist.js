import { getTokenFromLocalStorage } from './auth'
import axios from 'axios'

export const addToWishlist = async (event, setRerender) => {
  try {
    const token = getTokenFromLocalStorage()
    const { data } = await axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const wishlist = data.wishlist
    let newWishlist = new Array
    const experienceId = event.target.id
    if (!wishlist.includes(experienceId)) {
      newWishlist = [...wishlist, experienceId]
      event.target.classList.add('wishlist')
    } else {
      newWishlist = wishlist.filter(id => id !== experienceId)
      event.target.classList.remove('wishlist')
    }
  
    await axios.put('/api/profile', { 'wishlist': newWishlist },
      {
        headers: {
          'Authorization': `Bearer ${getTokenFromLocalStorage()}`
        }
      }
    )
    console.log('new wishlist -> ', newWishlist)

    setRerender(true)
  } catch (err) {
    console.log(err)
    console.log(err.response)
  }
}