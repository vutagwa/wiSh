import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { HttpAgent } from '@dfinity/agent';
import { Actor } from '@dfinity/agent'; 
import { idlFactory, canisterId } from '../../dfx_generates/report_case';

// Initialize the HttpAgent
const agent = new HttpAgent();

// Create an actor instance, adapting to the API version
let reportCaseActor;
try {
    if (typeof Actor.createActor === 'function') {
        reportCaseActor = Actor.createActor(idlFactory, { agent, canisterId });
    } else {
        reportCaseActor = Actor.createActor(idlFactory, {
            agent,
            canisterId,
        });
    }
} catch (err) {
    console.error('Error creating actor:', err);
}

(async () => {
    try {
        await agent.fetchRootKey();
    } catch (err) {
        console.error('Error fetching root key:', err);
    }
})();

const CaseReportingForm = () => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [incidentType, setIncidentType] = useState('');
    const [description, setDescription] = useState('');
    const [victimName, setVictimName] = useState('');
    const [offenderPicture, setOffenderPicture] = useState(null);
    const [wishCoins, setWishCoins] = useState(0); 

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setShowCalendar(false);
    };

    const handleDateClick = () => {
        setShowCalendar(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const pictureBlob = offenderPicture ? new Uint8Array(await offenderPicture.arrayBuffer()) : null;
            const dateInt = Math.floor(date.getTime() / 1000);

            await reportCaseActor.addReport(
                Date.now(),
                location,
                dateInt,
                incidentType,
                description,
                victimName || null,
                pictureBlob || null
            );

            // Update Wish Coins after successful report submission
            setWishCoins(wishCoins + 10);

            alert('Report submitted successfully');
        } catch (err) {
            console.error('Failed to submit report:', err);
            alert('Failed to submit report');
        }
    };

    return (
        <div className="case-reporting-form">
            <h2>Report a Crime</h2>
            <p>💰: {wishCoins}</p> {/* Display Wish Coins */}
            <form onSubmit={handleSubmit}>
                <label>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="text"
                        value={date.toLocaleDateString()}
                        onClick={handleDateClick}
                        readOnly
                    />
                    {showCalendar && (
                        <Calendar
                            onChange={handleDateChange}
                            value={date}
                            minDate={new Date()}
                        />
                    )}
                </label>
                <label>
                    Type of Incident:
                    <select value={incidentType} onChange={(e) => setIncidentType(e.target.value)}>
                        <option value="">Select incident type</option>
                        <option value="femicide">Femicide</option>
                        <option value="homicide">Homicide</option>
                        <option value="suicide">Suicide</option>
                        <option value="manslaughter">Manslaughter</option>
                        <option value="rape">Rape</option>
                        <option value="sexual-harassment">Sexual Harassment</option>
                        <option value="others">Others</option>
                    </select>
                </label>
                <label>
                    Description of Offense:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </label>
                <label>
                    Victim's Name (optional):
                    <input
                        type="text"
                        value={victimName}
                        onChange={(e) => setVictimName(e.target.value)}
                        placeholder="Enter victim's name"
                    />
                </label>
                <label>
                    Offender's Picture:
                    <input
                        type="file"
                        onChange={(e) => setOffenderPicture(e.target.files[0])}
                        accept="image/*"
                    />
                </label>
                <button type="submit">Submit Report</button>
            </form>
        </div>
    );
};

export default CaseReportingForm;
