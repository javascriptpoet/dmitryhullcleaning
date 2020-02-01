import { EventEmitter, captureRejectionSymbol } from "events"

const Collection = class Collection extends EventEmitter {
  constructor({ name }) {
    const collection = super({ captureRejections: true })
    collection.name = name
  }
  writeOne(record) {
    this.emit("Added", record)
  }
  readOne(id) {
    this.emit("Read", id)
  }
  update(id, updater) {
    this.emit("Updated", id, updater)
  }
  [captureRejectionSymbol](err, event, ...args) {
    console.log(
      `Collection ${this.name}: event ${event}: err=${err}: args=${args}`
    )
    this.destroy(err)
  }
}
