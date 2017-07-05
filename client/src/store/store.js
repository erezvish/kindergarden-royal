import actions from './actions'
import mutations from './mutations'
import kidService from '../services/kid.service.js'

export default {
    state: {
        kids: []
    },
    actions,
    mutations
}