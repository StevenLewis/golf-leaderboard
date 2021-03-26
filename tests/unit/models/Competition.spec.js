import Competition from '../../../src/models/Competition'
import firebase from 'firebase/app'
import 'firebase/firestore'

describe('Competition', () => {
    test('It returns wether the competition has been recorded', () => {
        let competition = new Competition({ id: '1', recordedAt: new Date() })

        expect(competition.isRecorded).toBe(true)
    })

    test('It returns wether the competition is in Ocotober', () => {
        let competition1 = new Competition({ id: '1', date: firebase.firestore.Timestamp.fromDate(new Date('2000-10-01')) })
        let competition2 = new Competition({ id: '2', date: firebase.firestore.Timestamp.fromDate(new Date('2020-10-10')) })
        let competition3 = new Competition({ id: '3', date: firebase.firestore.Timestamp.fromDate(new Date('2020-01-01')) })

        expect(competition1.isOctober).toBe(true)
        expect(competition2.isOctober).toBe(true)
        expect(competition3.isOctober).toBe(false)
    })

    test('It returns wether the competition is in November', () => {
        let competition1 = new Competition({ id: '1', date: firebase.firestore.Timestamp.fromDate(new Date('2000-11-01')) })
        let competition2 = new Competition({ id: '2', date: firebase.firestore.Timestamp.fromDate(new Date('2020-11-11')) })
        let competition3 = new Competition({ id: '3', date: firebase.firestore.Timestamp.fromDate(new Date('2020-01-01')) })

        expect(competition1.isNovember).toBe(true)
        expect(competition2.isNovember).toBe(true)
        expect(competition3.isNovember).toBe(false)
    })

    test('It returns wether any bonuses are available', () => {
        let competition1 = new Competition({ id: '1', date: firebase.firestore.Timestamp.fromDate(new Date('2000-11-01')), isChampionshipDay: false })
        let competition2 = new Competition({ id: '2', date: firebase.firestore.Timestamp.fromDate(new Date('2020-10-11')), isChampionshipDay: false })
        let competition3 = new Competition({ id: '3', date: firebase.firestore.Timestamp.fromDate(new Date('2020-01-01')), isChampionshipDay: false })
        let competition4 = new Competition({ id: '3', date: firebase.firestore.Timestamp.fromDate(new Date('2020-01-01')), isChampionshipDay: true })

        expect(competition1.bonusesAvailable).toBe(true)
        expect(competition2.bonusesAvailable).toBe(true)
        expect(competition3.bonusesAvailable).toBe(false)
        expect(competition4.bonusesAvailable).toBe(true)
    })
})
