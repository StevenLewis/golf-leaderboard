import Model from '../../../src/models/Model'

describe('Model', () => {
    test('it can be constructed with attributes', () => {
        let model = new Model({
            id: 1,
            colour: 'red'
        })

        expect(model.id).toEqual(1)
        expect(model.colour).toEqual('red')
    })

    test('it throws an error when trying to create a model without id', () => {
        expect(() => {
            return new Model({
                colour: 'red'
            })
        }).toThrowError()
    })

    test('it can be updated', () => {
        let model = new Model({
            id: 1,
            colour: 'red'
        })

        model.update({ colour: 'blue' })

        expect(model.colour).toEqual('blue')
    })

    test('the id cannot be updated', () => {
        let model = new Model({
            id: 1,
            colour: 'red'
        })

        model.update({ id: 123 })

        expect(model.id).toEqual(1)
    })
})
