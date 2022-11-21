export default class Property {
  constructor ({ id = 0, title = '', description = '', propertyType = '', location = '', assets = [], features = [] } = {}) {
    this.id = id
    this.title = title
    this.description = description
    this.location = location
    this.assets = assets
    this.propertyType = propertyType
    this.features = features
  }
}
