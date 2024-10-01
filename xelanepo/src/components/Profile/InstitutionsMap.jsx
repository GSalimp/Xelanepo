import React, { useState, useEffect, useRef } from 'react';
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
            mapRef.current.panTo(selectedPosition);
            const animateZoom = () => {
                if (mapRef.current.getZoom() < targetZoom) {
                    setTimeout(() => {
                        mapRef.current.setZoom(mapRef.current.getZoom() + 1);
                        animateZoom();
                    }, 150);
                }
            };
            animateZoom();
        }
    }, [selectedPosition, targetZoom]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyDu8mqAzl88lu18Vlrb51GeyFl3zh92NEg">
            <GoogleMap
                className="googleMap"
                mapContainerStyle={{ width: '100%', height: '300px' }}
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

function InstitutionsMap({ id }) {
    const [data, setData] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(10);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                await new Promise(r => setTimeout(r, 1000));

                const request = await fetch(`https://api.openalex.org/authors/${id}`);
                const requestData = await request.json();
                
                const tmpData = {};

                const institutionIDList = [];
                requestData.affiliations.forEach(affiliation => {
                    institutionIDList.push(affiliation.institution.id);
                    tmpData[affiliation.institution.display_name] = {
                        institution: affiliation.institution.display_name,
                        years: affiliation.years,
                        position: undefined
                    };
                });

                await new Promise(r => setTimeout(r, 10));

                const institutionsRequest = await fetch(`https://api.openalex.org/institutions?filter=id:${institutionIDList.join("|")}`);
                const institutionsData = await institutionsRequest.json();
                const institutions = institutionsData.results;

                // Use functional state update to ensure correct state
                setData(prevData => {
                    institutions.forEach(institution => {
                        if (tmpData[institution.display_name]) {
                            tmpData[institution.display_name].position = {
                                lat: institution.geo.latitude,
                                lng: institution.geo.longitude
                            };
                            prevData.push(tmpData[institution.display_name]);
                        }
                    });
                    return [...prevData]; // Return a new array
                });

            } catch (error) {
                console.error(error);
            }
        };

        fetchInstitutions();
    }, [id]); // Run this effect when the `id` changes

    if (!data.length) {
        return (
            <div className="InstitutionsMap profileItem">
                <span className="profileItemTitle">Institutions Map</span>
                <div className="loading"></div>
            </div>
        );
    }

    const handleCardClick = (position) => {
        setSelectedPosition(position);
        setZoomLevel(14);
    };

    const markers = data.map(item => item.position).filter(position => position); // Filter out undefined positions

    return (
        <div className="InstitutionsMap profileItem">
            <span className="profileItemTitle">Institutions Map</span>
            <div className="cards-map">
                <div className="institution-items">
                    {data.map((item, index) => (
                        <InstitutionCard
                            item={item}
                            key={`${item.institution}-${index}`} // Adjusted key
                            onClick={() => handleCardClick(item.position)}
                        />
                    ))}
                </div>
                <MapComponent className="googleMap" markers={markers} selectedPosition={selectedPosition} targetZoom={zoomLevel} />
            </div>
        </div>
    );
    
}

export { InstitutionsMap };
