import PlayerCollection from '../../src/models/PlayerCollection'
import CompetitionCollection from '../../src/models/CompetitionCollection'
import ResultCollection from '@/models/ResultCollection'

export const players = new PlayerCollection()
export const results = new ResultCollection()

players.add({ id: '#1', name: 'Steve', isGuest: false })
players.add({ id: '#2', name: 'Cris', isGuest: false })
players.add({ id: '#3', name: 'Sam', isGuest: false })
players.add({ id: '#4', name: 'Matt', isGuest: false })

results.collect([
    { id: '#1', playerId: '#1', qualifying: true, score: 25, competitionId: '#1' },
    { id: '#2', playerId: '#1', qualifying: true, score: 25, competitionId: '#2' },
    { id: '#3', playerId: '#1', qualifying: true, score: 25, competitionId: '#3' },
    { id: '#4', playerId: '#1', qualifying: true, score: 30, competitionId: '#4' },
    { id: '#5', playerId: '#1', qualifying: true, score: 30, competitionId: '#5' },
    { id: '#6', playerId: '#1', qualifying: true, score: 30, competitionId: '#6' },
    { id: '#7', playerId: '#1', qualifying: true, score: 30, competitionId: '#7' },
    { id: '#8', playerId: '#1', qualifying: true, score: 30, competitionId: '#8' },
    { id: '#9', playerId: '#1', qualifying: true, score: 38, competitionId: '#9' },
    { id: '#10', playerId: '#1', qualifying: true, score: 22, competitionId: '#10' },
    { id: '#11', playerId: '#1', qualifying: true, score: 24, competitionId: '#11' },
    { id: '#12', playerId: '#1', qualifying: true, score: 36, competitionId: '#12' },
    { id: '#13', playerId: '#1', qualifying: true, score: 36, competitionId: '#13' },
    { id: '#14', playerId: '#1', qualifying: false, score: 40, competitionId: '#14' },
    { id: '#15', playerId: '#2', qualifying: true, score: 20, competitionId: '#1' },
    { id: '#16', playerId: '#2', qualifying: true, score: 20, competitionId: '#2' },
    { id: '#17', playerId: '#2', qualifying: true, score: 20, competitionId: '#3' },
    { id: '#18', playerId: '#2', qualifying: true, score: 20, competitionId: '#4' },
    { id: '#19', playerId: '#2', qualifying: true, score: 25, competitionId: '#5' },
    { id: '#20', playerId: '#2', qualifying: true, score: 30, competitionId: '#6' },
    { id: '#21', playerId: '#2', qualifying: true, score: 32, competitionId: '#7' },
    { id: '#22', playerId: '#2', qualifying: true, score: 25, competitionId: '#8' },
    { id: '#23', playerId: '#2', qualifying: true, score: 25, competitionId: '#9' },
    { id: '#24', playerId: '#2', qualifying: true, score: 25, competitionId: '#10' }
])
