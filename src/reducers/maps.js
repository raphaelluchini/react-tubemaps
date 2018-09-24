const maps = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_MARKER':
      return {
        position: action.position
      }
    default:
      return state
  }
}


export default maps