import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents, useMap } from 'react-leaflet'

/**
 * Display a marker of the activity's location.
 * @param {NumberArray} The coordinates of the location. 
 * @returns The map containing a marker of the activity's location.
 */
const ActivityMap = ({ pos }) => {
    
    const LocationMarker = () => {
    
        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound() {
                map.flyTo(pos, 19)
            },
        })

        const flyToLocation = useMap()
        if(pos) flyToLocation.flyTo(pos, 17)

        return pos === null ? null : (
            <div>
                <Marker position={pos}>
                    <Popup>Over here!</Popup>
                </Marker>
            </div>
        )
    }

    return (
        <MapContainer
            center={pos}
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
            <LocationMarker/>
        </MapContainer>
    );
    
}

export default ActivityMap;

/*url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=MwxODXOFrbQpBFXv3rKc"
      attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'*/
