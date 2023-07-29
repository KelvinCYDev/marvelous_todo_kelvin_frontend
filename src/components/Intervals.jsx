import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const Intervals = ({ fetchDataRef, setFetchDataTrigger }) => {
  Intervals.propTypes = {
    fetchDataRef: PropTypes.object.isRequired,
    setFetchDataTrigger: PropTypes.func.isRequired,
  };
  const setFetchDataInterval = (interval) => {
    // Clear old interval
    if (fetchDataRef.current) {
      clearInterval(fetchDataRef.current);
      fetchDataRef.current = undefined;
    }

    // Set new interval
    if (interval > 0) {
      fetchDataRef.current = setInterval(() => {
        setFetchDataTrigger(Date.now());
      }, interval);
    }
  };

  return (
    <Form.Select
      defaultValue="0"
      onChange={({ target }) => setFetchDataInterval(target.value)}
    >
      <option value="0">Auto Refresh: OFF</option>
      <option value="5000">5 seconds</option>
      <option value="15000">15 seconds</option>
      <option value="30000">30 seconds</option>
      <option value="60000">1 minute</option>
    </Form.Select>
  );
};

export default Intervals;
