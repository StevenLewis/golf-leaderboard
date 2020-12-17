// Maps
export const addNettScore = result => {
    return {
        ...result,
        nett: result.score - result.cuts
    }
}

export const addCompetition = (state) => result => {
    return {
        ...result,
        competition: state.competitions[result.competitionId]
    }
}

// Sorts
export const byName = (a, b) => {
    if (a.name.toLowerCase() === b.name.toLowerCase()) {
        return 0
    }

    return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1
}

export const byDate = (a, b) => {
    if (a.competition.date === b.competition.date) {
        return 0
    }

    return (a.competition.date < b.competition.date) ? 1 : -1
}

export const byResult = (a, b) => {
    if (a.nett === b.nett) {
        return a.countback === b.countback ? 0 : (a.countback > b.countback) ? 1 : -1
    }

    return (a.nett < b.nett) ? 1 : -1
}

// Filter
export const byPlayer = (id) => result => result.playerId === id

export const isQualifying = result => result.qualifying

export const withoutGuests = player => !player.isGuest
