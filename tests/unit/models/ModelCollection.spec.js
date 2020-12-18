import ModelCollection from '../../../src/models/ModelCollection'
import Model from '../../../src/models/Model'

describe('ModelCollection', () => {
    describe('constructor()', () => {
        test('all items in the collection must have an id', () => {
            expect(() => {
                return new ModelCollection([{ id: 1, name: 'Maxi' }, { name: 'Gaz' }])
            }).toThrowError()
        })
    })

    describe('add()', () => {
        test('it can add models with attributes', () => {
            let collection = new ModelCollection()

            collection.add({ id: 1 })

            expect(collection.items).toHaveLength(1)
            expect(collection.items[0]).toBeInstanceOf(Model)
        })

        test('it cannot add 2 models with the same id', () => {
            let collection = new ModelCollection()

            collection.add({ id: 1 })

            expect(() => {
                collection.add({ id: 1 })
            }).toThrowError()
        })

        test('it can re-add removed models', () => {
            let collection = new ModelCollection()

            collection.add({ id: 1 })
            collection.remove(1)
            collection.add({ id: 1 })
        })

        test('it throws an error when trying to add a  model without id', () => {
            let collection = new ModelCollection()

            expect(() => {
                collection.add({ foo: 'bar' })
            }).toThrowError()
        })
    })

    describe('remove()', () => {
        test('it can remove a model', () => {
            let collection = new ModelCollection([{ id: 1 }])

            collection.remove(1)

            expect(collection.items).toHaveLength(0)
        })
    })

    describe('find()', () => {
        test('it can find a model by id', () => {
            let collection = new ModelCollection([{ id: 1, name: 'Maxi' }, { id: 2, name: 'Gaz' }, { id: 3, name: 'Sam' }])

            let item = collection.find(1)

            expect(item.name).toEqual('Maxi')
        })
    })

    describe('count()', () => {
        test('it returns the count of models', () => {
            let collection = new ModelCollection([{ id: 1, name: 'Maxi' }, { id: 2, name: 'Gaz' }, { id: 3, name: 'Sam' }])

            let actual = collection.count()

            expect(actual).toEqual(3)
        })
    })

    describe('exists()', () => {
        test('it checks if model exists by id', () => {
            let collection = new ModelCollection([{ id: 1, name: 'Maxi' }, { id: 2, name: 'Gaz' }])

            expect(collection.exists(1)).toBe(true)
            expect(collection.exists(2)).toBe(true)
            expect(collection.exists(3)).toBe(false)
        })
    })

    describe('where()', () => {
        test('equal `==`', () => {
            let collection = new ModelCollection([
                { id: 1, number: 1 },
                { id: 2, number: '1' },
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])

            let actual = collection.where('number', '==', '1')

            expect(actual.items).toEqual([
                { id: 1, number: 1 },
                { id: 2, number: '1' }
            ])
        })

        test('strict equal `===`', () => {
            let collection = new ModelCollection([
                { id: 1, number: 1 },
                { id: 2, number: '1' },
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])

            let actual = collection.where('number', '===', '1')

            expect(actual.items).toEqual([
                { id: 2, number: '1' }
            ])
        })

        test('not equal `!=`', () => {
            let collection = new ModelCollection([
                { id: 1, number: 1 },
                { id: 2, number: '1' },
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])

            let actual = collection.where('number', '!=', '1')

            expect(actual.items).toEqual([
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])
        })

        test('not equal `<>`', () => {
            let collection = new ModelCollection([
                { id: 1, number: 1 },
                { id: 2, number: '1' },
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])

            let actual = collection.where('number', '<>', '1')

            expect(actual.items).toEqual([
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])
        })

        test('strict not equal `!==`', () => {
            let collection = new ModelCollection([
                { id: 1, number: 1 },
                { id: 2, number: '1' },
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])

            let actual = collection.where('number', '!==', '1')

            expect(actual.items).toEqual([
                { id: 1, number: 1 },
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])
        })

        test('greater than `>`', () => {
            let collection = new ModelCollection([
                { id: 1, number: 1 },
                { id: 2, number: '1' },
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])

            let actual = collection.where('number', '>', '2')

            expect(actual.items).toEqual([
                { id: 5, number: '3' }
            ])
        })

        test('greater or equal than `>=`', () => {
            let collection = new ModelCollection([
                { id: 1, number: 1 },
                { id: 2, number: '1' },
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])

            let actual = collection.where('number', '>=', '2')

            expect(actual.items).toEqual([
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])
        })

        test('less than `<`', () => {
            let collection = new ModelCollection([
                { id: 1, number: 1 },
                { id: 2, number: '1' },
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])

            let actual = collection.where('number', '<', '2')

            expect(actual.items).toEqual([
                { id: 1, number: 1 },
                { id: 2, number: '1' }
            ])
        })

        test('less or equal than `<=`', () => {
            let collection = new ModelCollection([
                { id: 1, number: 1 },
                { id: 2, number: '1' },
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])

            let actual = collection.where('number', '<=', '2')

            expect(actual.items).toEqual([
                { id: 1, number: 1 },
                { id: 2, number: '1' },
                { id: 3, number: '2' },
                { id: 4, number: '2' }
            ])
        })

        test('strict equal by default', () => {
            let collection = new ModelCollection([
                { id: 1, number: 1 },
                { id: 2, number: '1' },
                { id: 3, number: '2' },
                { id: 4, number: '2' },
                { id: 5, number: '3' }
            ])

            let actual = collection.where('number', '1')

            expect(actual.items).toEqual([
                { id: 2, number: '1' }
            ])
        })
    })

    describe('sortBy()', () => {
        test('sorting by key', () => {
            let collection = new ModelCollection([
                { id: 1, name: 'Desk', price: 200 },
                { id: 2, name: 'Chair', price: 100 },
                { id: 3, name: 'Bookcase', price: 150 }
            ])

            let actual = collection.sortBy('price')

            expect(actual.items).toEqual([
                { id: 2, name: 'Chair', price: 100 },
                { id: 3, name: 'Bookcase', price: 150 },
                { id: 1, name: 'Desk', price: 200 }
            ])
        })

        test('sorting by given callback', () => {
            let collection = new ModelCollection([
                { id: 1, name: 'Desk', colors: ['Black', 'Mahogany'] },
                { id: 2, name: 'Chair', colors: ['Black'] },
                { id: 3, name: 'Bookcase', colors: ['Red', 'Beige', 'Brown'] }
            ])

            const actual = collection.sortBy((product, key) => {
                return product['colors'].length
            })

            expect(actual.items).toEqual([
                { id: 2, name: 'Chair', colors: ['Black'] },
                { id: 1, name: 'Desk', colors: ['Black', 'Mahogany'] },
                { id: 3, name: 'Bookcase', colors: ['Red', 'Beige', 'Brown'] }
            ])
        })
    })

    describe('sortByDesc()', () => {
        test('sorting by key', () => {
            let collection = new ModelCollection([
                { id: 1, name: 'Desk', price: 200 },
                { id: 2, name: 'Chair', price: 100 },
                { id: 3, name: 'Bookcase', price: 150 }
            ])

            let actual = collection.sortByDesc('price')

            expect(actual.items).toEqual([
                { id: 1, name: 'Desk', price: 200 },
                { id: 3, name: 'Bookcase', price: 150 },
                { id: 2, name: 'Chair', price: 100 }
            ])
        })

        test('sorting by given callback', () => {
            let collection = new ModelCollection([
                { id: 1, name: 'Desk', colors: ['Black', 'Mahogany'] },
                { id: 2, name: 'Chair', colors: ['Black'] },
                { id: 3, name: 'Bookcase', colors: ['Red', 'Beige', 'Brown'] }
            ])

            const actual = collection.sortByDesc((product, key) => {
                return product['colors'].length
            })

            expect(actual.items).toEqual([
                { id: 3, name: 'Bookcase', colors: ['Red', 'Beige', 'Brown'] },
                { id: 1, name: 'Desk', colors: ['Black', 'Mahogany'] },
                { id: 2, name: 'Chair', colors: ['Black'] }
            ])
        })
    })

    describe('first()', () => {
        test('get the first item', () => {
            let collection = new ModelCollection([
                { id: 1, name: 'Desk', price: 200 },
                { id: 2, name: 'Chair', price: 100 },
                { id: 3, name: 'Bookcase', price: 150 }
            ])

            let actual = collection.first()

            expect(actual).toEqual({ id: 1, name: 'Desk', price: 200 })
        })

        test('get the first item to match the callback', () => {
            let collection = new ModelCollection([
                { id: 1, name: 'Desk', price: 200 },
                { id: 2, name: 'Chair', price: 100 },
                { id: 3, name: 'Bookcase', price: 150 }
            ])

            let actual = collection.first((item) => item.price === 100)

            expect(actual).toEqual({ id: 2, name: 'Chair', price: 100 })
        })

        test('get the first item if callback does not match any item', () => {
            let collection = new ModelCollection([
                { id: 1, name: 'Desk', price: 200 },
                { id: 2, name: 'Chair', price: 100 },
                { id: 3, name: 'Bookcase', price: 150 }
            ])

            let actual = collection.first((item) => item.price > 500)

            expect(actual).toEqual({ id: 1, name: 'Desk', price: 200 })
        })
    })
})
