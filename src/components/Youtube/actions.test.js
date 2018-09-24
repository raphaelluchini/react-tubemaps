
import { updateVideo } from './actions';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const expectedAction = {
      type: 'UPDATE_VIDEO',
      video: { video: 'video' }
    }
    expect(updateVideo({ video: 'video' })).toEqual(expectedAction)
  })
})