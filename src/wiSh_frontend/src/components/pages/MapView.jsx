import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { HttpAgent } from '@dfinity/agent';
import { idlFactory, canisterId } from '../../dfx_generates/report_case';
import { Actor } from '@dfinity/agent';

// Initialize the HttpAgent
const agent = new HttpAgent();

// Create an actor instance
const reportCaseActor = Actor.createActor(idlFactory, { agent, canisterId });

const MapView = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const reports = await reportCaseActor.listReports();
                setReports(reports);
            } catch (err) {
                console.error('Failed to fetch reports:', err);
            }
        };

        fetchReports();
    }, []);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {reports.map((report) => (
                <Marker
                    key={report.id}
                    position={[parseFloat(report.location.split(',')[0]), parseFloat(report.location.split(',')[1])]}
                >
                    <Popup>
                        <strong>{report.incidentType}</strong><br />
                        {report.description}<br />
                        Date: {new Date(report.date * 1000).toLocaleDateString()}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;
