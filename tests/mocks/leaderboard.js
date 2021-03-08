import PlayerCollection from '../../src/models/PlayerCollection'
import CompetitionCollection from '../../src/models/CompetitionCollection'
import ResultCollection from '@/models/ResultCollection'

export const players = new PlayerCollection()
export const competitions = new CompetitionCollection()
export const results = new ResultCollection()

players.add({ id: '#1', name: 'Steve', isGuest: false })
players.add({ id: '#2', name: 'Cris', isGuest: false })
players.add({ id: '#3', name: 'Sam', isGuest: false })
players.add({ id: '#4', name: 'Matt', isGuest: false })

competitions.add({ id: '#1', seasonId: '#1', date: new Date('2000-01-01') })
competitions.add({ id: '#2', seasonId: '#1', date: new Date('2010-12-25') })
competitions.add({ id: '#3', seasonId: '#1', date: new Date('2000-01-10') })
competitions.add({ id: '#4', seasonId: '#1', date: new Date('2008-08-12') })
competitions.add({ id: '#5', seasonId: '#1', date: new Date('2015-04-01') })
competitions.add({ id: '#6', seasonId: '#1', date: new Date('2010-10-28') })
competitions.add({ id: '#7', seasonId: '#1', date: new Date('2000-03-01') })
competitions.add({ id: '#8', seasonId: '#1', date: new Date('2015-10-10') })
competitions.add({ id: '#9', seasonId: '#1', date: new Date('2020-01-01') })
competitions.add({ id: '#10', seasonId: '#1', date: new Date('2008-08-20') })
competitions.add({ id: '#11', seasonId: '#2', date: new Date('2001-01-01') })
competitions.add({ id: '#12', seasonId: '#2', date: new Date('2020-11-01') })
competitions.add({ id: '#13', seasonId: '#2', date: new Date('2000-02-01') })
competitions.add({ id: '#14', seasonId: '#2', date: new Date('2000-01-01') })

results.collect([
    { id: '#1', playerId: '#1', qualifying: true, score: 25, competitionId: '#1', competition: competitions.find('#1') },
    { id: '#2', playerId: '#1', qualifying: true, score: 25, competitionId: '#2', competition: competitions.find('#2') },
    { id: '#3', playerId: '#1', qualifying: true, score: 25, competitionId: '#3', competition: competitions.find('#3') },
    { id: '#4', playerId: '#1', qualifying: true, score: 30, competitionId: '#4', competition: competitions.find('#4') },
    { id: '#5', playerId: '#1', qualifying: true, score: 30, competitionId: '#5', competition: competitions.find('#5') },
    { id: '#6', playerId: '#1', qualifying: true, score: 30, competitionId: '#6', competition: competitions.find('#6') },
    { id: '#7', playerId: '#1', qualifying: true, score: 30, competitionId: '#7', competition: competitions.find('#7') },
    { id: '#8', playerId: '#1', qualifying: true, score: 30, competitionId: '#8', competition: competitions.find('#8') },
    { id: '#9', playerId: '#1', qualifying: true, score: 38, competitionId: '#9', competition: competitions.find('#9') },
    { id: '#10', playerId: '#1', qualifying: true, score: 22, competitionId: '#10', competition: competitions.find('#10') },
    { id: '#11', playerId: '#1', qualifying: true, score: 24, competitionId: '#11', competition: competitions.find('#11') },
    { id: '#12', playerId: '#1', qualifying: true, score: 36, competitionId: '#12', competition: competitions.find('#12') },
    { id: '#13', playerId: '#1', qualifying: true, score: 36, competitionId: '#13', competition: competitions.find('#13') },
    { id: '#14', playerId: '#1', qualifying: false, score: 40, competitionId: '#14', competition: competitions.find('#14') },
    { id: '#15', playerId: '#2', qualifying: true, score: 20, competitionId: '#1', competition: competitions.find('#1') },
    { id: '#16', playerId: '#2', qualifying: true, score: 20, competitionId: '#2', competition: competitions.find('#2') },
    { id: '#17', playerId: '#2', qualifying: true, score: 20, competitionId: '#3', competition: competitions.find('#3') },
    { id: '#18', playerId: '#2', qualifying: true, score: 20, competitionId: '#4', competition: competitions.find('#4') },
    { id: '#19', playerId: '#2', qualifying: true, score: 25, competitionId: '#5', competition: competitions.find('#5') },
    { id: '#20', playerId: '#2', qualifying: true, score: 30, competitionId: '#6', competition: competitions.find('#6') },
    { id: '#21', playerId: '#2', qualifying: true, score: 32, competitionId: '#7', competition: competitions.find('#7') },
    { id: '#22', playerId: '#2', qualifying: true, score: 25, competitionId: '#8', competition: competitions.find('#8') },
    { id: '#23', playerId: '#2', qualifying: true, score: 25, competitionId: '#9', competition: competitions.find('#9') },
    { id: '#24', playerId: '#2', qualifying: true, score: 25, competitionId: '#10', competition: competitions.find('#10') }
])
