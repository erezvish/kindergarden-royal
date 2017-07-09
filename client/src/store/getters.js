export default {
    filteredKids: (state) => {
        console.log('getter working!')
        return state.kids.filter(kid =>
            (kid.firstName.toLowerCase() + ' ' + kid.lastName.toLowerCase())
                .includes(state.kidsFilter)
        )
    }
}

