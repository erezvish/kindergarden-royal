export default {
    filteredKids: (state) => {
        console.log('getter working!')
        return state.kids.filter(kid => 
        kid.firstName.includes(state.kidsFilter) ||  kid.lastName.includes(state.kidsFilter)
        )
    }
}

