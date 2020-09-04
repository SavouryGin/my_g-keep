class Service {

    constructor() {
        this.store = {}        
        this._count = 0
    }

    add(obj) {
        let id = `id-${this._count}`
        this.store[id] = obj
        this._count++
    }

    getById(id) {
        if (this.store.hasOwnProperty(id)) {
            return this.store[id]
        } else {
            return null
        }
    }

    getAll() {
        let arrObj = []
        for (let id in this.store) {
            if (this.store.hasOwnProperty(id)) {
                arrObj.push(this.store[id])
            }            
        }
        return arrObj
    }

    deleteById(id) {

        if (this.store.hasOwnProperty(id)) {
            const delObj = this.store[id]
            delete this.store[id]
            return delObj
        } else {
            return null
        }
    }

    updateById(id, obj) {
        if (this.store.hasOwnProperty(id)) {

            if(typeof obj === 'object') {
                for (let prop in obj) {
                    this.store[id][prop] = obj[prop]
                }
            } else {
                this.replaceById(id, obj)
            }

        } else {
            console.log(`An object with id ${id} does not exist in the store.`)
        }
    }

    replaceById(id, obj) {

        if (this.store.hasOwnProperty(id)) {
            delete this.store[id]
            this.store[id] = obj
        } else {
            console.log(`An object with id ${id} does not exist in the store.`)
        }
    }
}