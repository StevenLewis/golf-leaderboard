# Golf Leaderboard #

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



# TODO #

### Leaderboard
- [x] Qualifying vs non-qualifying results
- [x] Add Total Qualifying Points
- [x] Create 'qualifyingAverage' based of all qualifying results
- [x] Drop 'average'
- [x] Order leaderboard by totalScore
- [x] totalScore should be topTenTotal

### Single player
- [x] Date formatting
- [x] Display meta info, ie. Best score, Worst Score
- [ ] Edit player name
- [ ] Select season dropdown or 'All Time'
- [ ] Order results reverse chronilogically

### All Players
- [ ] Remove player

### Competitions
- [x] Create competition
- [x] Add result
- [x] Validate only one result per player, per competition
- [x] Remove result
- [x] Show nett score column
- [x] Show prize money column
- [x] Show player count & prize money structure at top of page
- [ ] Add score via text input in leaderboard
- [ ] Enter brand new player after competition is created

### Season
- [x] Create a season, uuid & custom name (2019-20) 
- [x] Season has a one to many relationship with competitions
- [ ] Coloured leaderboard based on qualification

### General
- [x] Datepicker
- [x] Styles & UI
- [x] Firebase Hosting
- [ ] Responsive

### Authentication
- [x] Set up Users in Firestore
- [x] Register
- [x] Login

### Money
- [x] Show winnings for given competition
- [x] Running profit/loss total for each player

### Cuts
- [x] Nett score including cuts when result is entered
- [x] Apply cuts to player based on profit
- [x] Running total of winnings for each player, can be reset, separate to profit/loss
- [x] Calculate cuts based on players runningTotal
- [ ] Admin can 'Reset' winnings/runningTotal

### Future
- [x] Countback
- [ ] Biggest differential
- [ ] Best/Worst score for a season

### Tech Debt
- [ ] Test components
- [ ] Consistent import of actions/mutations
