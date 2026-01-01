import ajax from './index.js'

export const apiTest = async () => await ajax.get('/futurama/characters')
