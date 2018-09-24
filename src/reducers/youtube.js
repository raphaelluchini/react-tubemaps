const youtube = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_VIDEO':
      return {
        video: action.video
      }
    default:
      return state
  }
}


export default youtube