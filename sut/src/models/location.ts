import { UUID, randomUUID } from "crypto"

export interface Coordinates {
    lon: number,
    lat: number
}

export class Location {
    name: string
    coordinates: Coordinates

    constructor(name: string, coordinates: Coordinates) {
        this.name = name
        this.coordinates = coordinates
    }
}

const locations = new Map<string, Location>()

export function getLocations(): Location[] {
    return Array.from(locations.values())
}

export function getLocationByName(name: string): Location | undefined {
    return locations.get(name)
}

export function addLocation(name: string, coordinates: Coordinates): Location | undefined {

    if (name === undefined || name.length === 0) {
        throw new Error("Missing property: 'name'")
    }
    if (coordinates === undefined) {
        throw new Error("Missing property: 'coordinates'")
    }
    const newLocation = new Location(name, coordinates)
    locations.set(newLocation.name, newLocation)
    return newLocation
}

export function removeLocation(name: string) {
    return locations.delete(name)
}

// Some sample data
addLocation('Greenwich', { lat: 51.5, lon: 0 })
addLocation('Oslo', { lat: 59.8938549, lon: 10.7851165 })
addLocation('Roma', { lat: 41.9100711, lon: 12.5359979 })
addLocation('Sydney', { lat: -33.8482439, lon: 150.9319747 })