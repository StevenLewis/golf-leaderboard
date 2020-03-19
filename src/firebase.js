import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: 'AIzaSyC5ztsDOt5qUe_Mdy5i66-hH9Yl4psPvGg',
    authDomain: 'golf-leaderboard-62dbb.firebaseapp.com',
    databaseURL: 'https://golf-leaderboard-62dbb.firebaseio.com',
    projectId: 'golf-leaderboard-62dbb',
    storageBucket: 'golf-leaderboard-62dbb.appspot.com',
    messagingSenderId: '486375743985'
})

let db = firebase.firestore()

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
})

let players = db.collection('players')
let results = db.collection('results')
let competitions = db.collection('competitions')

export default {
    db,
    players,
    results,
    competitions
}
