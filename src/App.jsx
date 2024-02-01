import { useEffect, useState } from 'react';
import './App.css'
import Checkbox from './components/CheckBox';
import data from './data';

function App() {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC"); // State for selected timezone

  const [currentDate, setCurrentDate] = useState(new Date()); // State for current date

  const [preselectedTimeSlots, setPreselectedTimeSlots] = useState([]);

  useEffect(() => {
    // Fetch initial data from JSON file when the component mounts
    fetchInitialData();
  }, [currentDate]);

  const fetchInitialData = async () => {
    try {
     
      setPreselectedTimeSlots(data);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };
  const handleNextButtonClick = () => {
    // Increment current date by one week
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const handlePreviousButtonClick = () => {
    // Decrement current date by one week
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setCurrentDate(previousWeek);
  };
console.log(preselectedTimeSlots)
  // Function to get the start and end dates of the week
  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the first day of the week

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the last day of the week

    return { startOfWeek, endOfWeek };
  };

  const formatDate = (date, timezone) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: timezone,
    }).format(date);
  };
  const { startOfWeek, endOfWeek } = getWeekDates();
  return (
    <>
      <div className='container'>
        <div className="header">
          {/* Previous button */}
          <button onClick={handlePreviousButtonClick}>Previous</button>

          {/* Current date */}
          <div className="current-date">
          {formatDate(startOfWeek, selectedTimezone)} - {formatDate(endOfWeek, selectedTimezone)}
          </div>

          {/* Next button */}
          <button onClick={handleNextButtonClick}>Next</button>
        </div>

        {/* Timezone select box */}
        <div className="timezone-select">
          <label htmlFor="timezone">Select Timezone:</label>
          <select
            id="timezone"
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
          >
           <option value="UTC">UTC (Coordinated Universal Time)</option>
  <option value="America/New_York">America/New_York (Eastern Time)</option>
  <option value="America/Chicago">America/Chicago (Central Time)</option>
  <option value="America/Denver">America/Denver (Mountain Time)</option>
  <option value="America/Los_Angeles">America/Los_Angeles (Pacific Time)</option>
  <option value="Europe/London">Europe/London (Greenwich Mean Time)</option>
  <option value="Europe/Berlin">Europe/Berlin (Central European Time)</option>
  <option value="Asia/Tokyo">Asia/Tokyo (Japan Standard Time)</option>
  <option value="Australia/Sydney">Australia/Sydney (Australian Eastern Time)</option>
            {/* Add other timezones as needed */}
          </select>
        </div>

        {/* Days and time selection */}
        <div className="days-and-time">
          {/* Left column for days */}
          <div className="days-column">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <div key={day} className="day-checkbox">
                <div style={{ width: "30px" }}>
                  <p>{day}</p>
                </div>
                <div className='check'>
                <Checkbox day={day} timeSlot={preselectedTimeSlots}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
