import { type Act } from '@/types'
import coordinates from '@/data/coords.json'

const locationMap = new Map<string, number[]>(coordinates as [string, number[]][])

interface Location {
  location: [number, number]
  locationAccuracy: number
}

const getCurrentPosition = async (): Promise<GeolocationPosition> => {
  return await new Promise((resolve, reject) => {
    if (navigator.geolocation === undefined) {
      reject(new Error('Geolocation not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  })
}

export const getCurrentLocation = async (): Promise<Location> => {
  const position = await getCurrentPosition()
  return {
    locationAccuracy: position.coords.accuracy,
    location: [
      position.coords.latitude,
      position.coords.longitude
    ]
  }
}

export const getLocationByAddress = async (address: Act['address']): Promise<Location | void> => {
  const request = {
    street: [address.streetType, address.streetName, address.building].filter(Boolean).join(','),
    city: address.admin4?.replace(/^(місто|село|селище) /, ''),
    county: address.admin2,
    state: address.admin1,
    country: 'Україна',
    format: 'json'
  } as Record<string, string>
  const osmRequest = new URLSearchParams(request)

  // Get data from OSM
  const result = await fetch(`https://nominatim.openstreetmap.org/search?${String(osmRequest)}`).catch(_ => (false))
  if (typeof result === 'boolean') return alert('Неможливо визначити точні координати')
  const json = await result.json()
  if (json.error !== undefined) return alert('Неможливо визначити точні координати')
  const osmLocation = json?.[0]
  if (osmLocation === undefined) return alert('Неможливо визначити точні координати')
  return {
    location: [parseFloat(osmLocation.lat), parseFloat(osmLocation.lon)],
    locationAccuracy: osmLocation.addressType === 'building' ? 0 : 50
  }
}

export const getLocationByAdmin4 = (code4: string): Act['coordinates'] | undefined => {
  return locationMap.get(code4.slice(0, 12))
}

export default getCurrentLocation
