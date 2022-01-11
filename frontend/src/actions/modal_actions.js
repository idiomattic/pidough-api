export const DISPLAY_MODAL = 'DISPLAY_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

export const displayModal = modal => ({
  type: DISPLAY_MODAL,
  modal
})

export const hideModal = () => ({
  type: HIDE_MODAL
})