export default {
    filteredKids: (state) => {
        console.log('getter working!')
        var currFilter = state.kids.filter(kid =>
            (kid.firstName.toLowerCase() + ' ' + kid.lastName.toLowerCase())
                .includes(state.kidsFilter.text)
        )
        // debugger;
        if (state.kidsFilter.radio === "present") currFilter = currFilter.filter(kid => kid.isPresent)
        else if (state.kidsFilter.radio === "absent") currFilter.filter(kid => !kid.isPresent)
        return currFilter;
    }
}

