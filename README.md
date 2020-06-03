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
- [ ] Remove result
- [ ] Edit player name
- [x] Display meta info, ie. Best score, Worst Score

### All Players
- [ ] Remove player

### Competitions
- [x] Create competition
- [x] Add result
- [x] Validate only one result per player, per competition

### Season
- [ ] Url structure - /2018-2019 or ?season=2018-2019
- [ ] On created, query store results based on season

### General
- [x] Datepicker
- [x] Styles & UI

### Future
 - [ ] Admin interface
 - [ ] Money
 - [ ] Cuts
 - [ ] Biggest differential
 - [ ] Best/Worst score for a season
