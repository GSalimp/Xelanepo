import React, { useRef, useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import "./../styles/ProfileItens/InstitutionsMap.css";

const MapComponent = ({ markers }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (markers.length && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            markers.forEach(marker => bounds.extend(marker));
            mapRef.current.fitBounds(bounds);
        }
    }, [markers]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyDu8mqAzl88lu18Vlrb51GeyFl3zh92NEg">
            <GoogleMap
                mapContainerStyle={{ width: '900px', height: '400px' }}
                onLoad={map => {
                    mapRef.current = map;
                }}
                onUnmount={() => mapRef.current = null}
            >
                {markers.map((marker, index) => (
                    <MarkerF
                        key={index}
                        position={marker}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

function InstitutionCard({ item }) {
    return (
        <div className="institution-card">
            <div className="years">
                {item.years.map((year) => (
                    <span key={year}>{year}</span>
                ))}
            </div>
            <span className="name">{item.institution}</span>
        </div>
    );
}

function InstitutionsMap() {
    const data = [
        {
            institution: "USP",
            years: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            position: { lat: -3.745, lng: -38.523 }
        },
        {
            institution: "UNICAMP",
            years: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            position: { lat: -3.755, lng: -38.533 }
        },
        {
            institution: "UNESP",
            years: [2012, 2013, 2014, 2015, 2016, 2017, 2018],
            position: { lat: 0, lng: 0 }
        }
    ];

    // Extract marker positions from the data
    const markers = data.map(item => item.position);

    return (
        <div className="InstitutionsMap profileItem">
            <span>InstitutionsMap</span>
            <div className="cards-map">
                <div className="institution-items">
                    {data.map((item) => (
                        <InstitutionCard item={item} key={item.institution} />
                    ))}
                </div>
                <MapComponent markers={markers} />
            </div>
        </div>
    );
}

export { InstitutionsMap };
