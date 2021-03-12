import Errors from '@/classes/Errors'

class Validator {
    constructor () {
        this.errors = new Errors()
    }

    /**
   * Validate the data against given rules
   *
   * @param {object} data
   * @return {Promise}
   */
    validate (data) {
        if (data === undefined) {
            throw new Error('You must pass in the data')
        }

        this.errors.clear()

        const errors = {}

        return new Promise((resolve, reject) => {
            this.rules.forEach(rule => {
                if (rule.criteria(data)) {
                    errors[rule.field] ? errors[rule.field].push(rule.message) : errors[rule.field] = [rule.message]
                }
            })

            this.errors.record(errors)

            if (this.errors.any()) {
                reject(this.errors)
            } else {
                resolve()
            }
        })
    }

    /**
   * Get the error message(s) for the given field.
   *
   * @param field
   */
    hasError (field) {
        return this.errors.has(field)
    }

    /**
   * Get the first error message for the given field.
   *
   * @param {string} field
   * @return {string}
   */
    getError (field) {
        return this.errors.first(field)
    }

    /**
   * Get the error messages for the given field.
   *
   * @param {string} field
   * @return {array}
   */
    getErrors (field) {
        return this.errors.get(field)
    }
}

export default Validator
