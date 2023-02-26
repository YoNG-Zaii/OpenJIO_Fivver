
import { useContext } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet'
import { ActivityContext } from '../HomeUI'

/**
 * Calculate the distance between two coordinates.
 * @param {Number} lat1 Latitute of location 1.
 * @param {Number} long1 Longitute of location 1.
 * @param {Number} lat2 Latitute of location 2.
 * @param {Number} long2 Longitude of location 2.
 * @returns The distance between two coordinates.
 */
const calcDistanceBetween = (lat1, long1, lat2, long2) => {

  var R = 6371;
  var dLat = toRad(lat2 - lat1)
  var dLong = toRad(long2 - long1)
  var Lat1 = toRad(lat1)
  var Lat2 = toRad(lat2)

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLong / 2) * Math.sin(dLong / 2) * Math.cos(Lat1) * Math.cos(Lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c

  function toRad(value) {
    return value * Math.PI / 180
  }
}

/**
 * Call OneMapAPI to get the coordinates of a location.
 * @param {String} location The location
 * @returns The coordinates of the location.
 */
const getMapData = async (location) => {
  const res = await fetch('https://developers.onemap.sg/commonapi/search?searchVal=' + location + '&returnGeom=Y&getAddrDetails=Y&pageNum=1')
  const data = await res.json()
  return data.results[0]
}

/**
 * Display markers of the locations.
 * @param {NumberArray} The coordinates of the locations. 
 * @returns The map containing marker(s) of the locations.
 */
const Map = ({ pos }) => {
  // const loc = pos.toLowerCase()
  // const [position, setPosition] = useState({ lat: location[loc][0], lng: location[loc][1] })
  const { activities, userLocation } = useContext(ActivityContext)
  
  /**
   * Filter activities to within 10 km from the current location.
   * @returns Nearby activities within 10 km.
   */
  const getNearByActivities = () => {
    var nearAct = []
    activities.forEach((act) => {
      if (act.diff <= 10) {
        nearAct.push(act)
      }
    })
    return nearAct
  }

  /**
   * The marker on the map.
   * @returns A marker on the map.
   */
  const LocationMarker = () => {
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        map.flyTo(e.latlng, 19)
      },
    })

    const nearAct = getNearByActivities()

    return userLocation === null ? null : (
      <div>
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>
        {nearAct.map((act) => (
          <Marker key={act.uid} position={{ lat: act.location.lat, lng: act.location.lng }}>
            <Popup> {act.title} </Popup>
          </Marker>
        ))}
      </div>
    )
  }

  return (
    <MapContainer
      center={userLocation}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxNativeZoom='19'
        maxZoom='19'
      />
      <ZoomControl position='topleft' />
      <LocationMarker key={Math.random()} />
    </MapContainer>
  );
}

export default Map;
export { calcDistanceBetween, getMapData };
/*url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=MwxODXOFrbQpBFXv3rKc"
      attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'*/
