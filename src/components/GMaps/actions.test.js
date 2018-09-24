
import { updateMarker } from './actions';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const expectedAction = {
      type: 'UPDATE_MARKER',
      position: { lat: 0, lng:0 }
    }
    expect(updateMarker({ lat: 0, lng:0 })).toEqual(expectedAction)
  })
})