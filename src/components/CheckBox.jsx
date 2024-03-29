import PropTypes from 'prop-types';
const Checkbox = ({day,date,timeSlot}) => {
  const time = [
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 pM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
  ];
  console.log(date,day)
  return (
    <>
      {time.map((value, key) => {
        const isChecked = timeSlot.some((val) => val.time === value && val.date===date && val.day===day);

        return (
          <div key={key}>
            <input
              type="checkbox"
              style={{ marginLeft: "25px" }}
              id={key}
              defaultChecked={isChecked}
            />
            <label htmlFor={`l${key}`}>{value}</label>
          </div>
        );
      })}
    </>
  );
};
Checkbox.propTypes = {
  timeSlot: PropTypes.array.isRequired,
  day: PropTypes.array.isRequired,
  date: PropTypes.array.isRequired,
};
export default Checkbox;
