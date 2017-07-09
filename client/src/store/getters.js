export default {
    filteredKids: (state) => {
        console.log('getter working!')
        return state.kids.filter(kid =>
            (kid.firstName.toLowerCase() + ' ' + kid.lastName.toLowerCase())
                .includes(state.kidsFilter)
        )
    },
    radioFilter: (state) => {
        console.log('radio getter working!')
        return state.kids.filter(kid =>
            (kid.firstName.toLowerCase() + ' ' + kid.lastName.toLowerCase())
                .includes(state.kidsFilter)
        )
    }
}

