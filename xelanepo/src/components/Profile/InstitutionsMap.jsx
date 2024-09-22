import React, { useRef, useEffect, useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import "./../styles/ProfileItens/InstitutionsMap.css";

const MapComponent = ({ markers, selectedPosition, targetZoom }) => {
    const mapRef = useRef(null);
    const [currentZoom, setCurrentZoom] = useState(10);

    useEffect(() => {
        if (markers.length && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            markers.forEach(marker => bounds.extend(marker));
            mapRef.current.fitBounds(bounds);
        }
    }, [markers]);

    useEffect(() => {
        if (selectedPosition && mapRef.current) {
            // Smoothly pan to the new position
            mapRef.current.panTo(selectedPosition);

            // Animate the zoom level change
            const animateZoom = () => {
                if (mapRef.current.getZoom() < targetZoom) {
                    setTimeout(() => {
                        mapRef.current.setZoom(mapRef.current.getZoom() + 1);
                        animateZoom();
                    }, 150); // Adjust this for smoother/faster animation
                }
            };
            animateZoom();
        }
    }, [selectedPosition, targetZoom]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyDu8mqAzl88lu18Vlrb51GeyFl3zh92NEg">
            <GoogleMap
                mapContainerStyle={{ width: '900px', height: '300px' }}
                zoom={currentZoom}
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

function InstitutionCard({ item, onClick }) {
    return (
        <div className="institution-card" onClick={onClick}>
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

    const [selectedPosition, setSelectedPosition] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(10);

    const handleCardClick = (position) => {
        setSelectedPosition(position);
        setZoomLevel(14); // Target zoom level
    };

    const markers = data.map(item => item.position);

    return (
        <div className="InstitutionsMap profileItem">
            <span>InstitutionsMap</span>
            <div className="cards-map">
                <div className="institution-items">
                    {data.map((item) => (
                        <InstitutionCard
                            item={item}
                            key={item.institution}
                            onClick={() => handleCardClick(item.position)}
                        />
                    ))}
                </div>
                <MapComponent markers={markers} selectedPosition={selectedPosition} targetZoom={zoomLevel} />
            </div>
        </div>
    );
}

export { InstitutionsMap };
