const INITIAL_STATE = {
    name: '',
    email: '',
    minYear: '18',
    maxYear: '30',
    gender: '',
    photo: '',
    phone: ''
}

export default (state = INITIAL_STATE, action) => {
    if(action.type == 'modifica_name'){
        return { ...state, name: action.payload }
    }
    if(action.type == 'modifica_email') {
        return { ...state, email: action.payload }
    }
    if(action.type == 'modifica_minyear') {
        return { ...state, minYear: action.payload }
    }
    if(action.type == 'modifica_maxyear') {
        return { ...state, maxYear: action.payload }
    }
    if(action.type == 'modifica_gender') {
        return { ...state, gender: action.payload }
    }
    if(action.type == 'modifica_photo') {
        return { ...state, photo: action.payload }
    }
    if(action.type == 'modifica_phone') {
        return { ...state, phone: action.payload }
    }
    return state;
}
