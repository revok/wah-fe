import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import moment from 'moment';
import React, { MouseEvent, useEffect } from 'react';
import { Container as DiContainer } from 'typedi';
import ApiService from '../../../services/api.service';
import NeutralIcon from '../../shared/neutralIcon/NeutralIcon';
import './Survey.scss';

const Survey: React.FC = () => {

  const [selectedIdx, setSelectedIdx] = React.useState(-1);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // This is equivalent to didMount for a functional component.
  // Check if we already submitted today.
  useEffect(() => {
    const lastSubmitTimestamp = localStorage.getItem('lastSubmit');

    if (lastSubmitTimestamp) {
      const today = moment();
      const lastSubmit = moment(lastSubmitTimestamp);
      setIsSubmitted(lastSubmit.isSame(today, 'day'));
    } else {
      setIsSubmitted(false);
    }
  }, []);


  const handleSelectionChange = (newValue: number) => {
    setSelectedIdx(newValue);
  };

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();

    if (selectedIdx !== -1) {

      const apiService = DiContainer.get(ApiService);

      if (apiService) {
        apiService
          .postEntry(selectedIdx)
          .then((e) => {
            debugger;

            if (e) {
              setIsSubmitted(true);
            }
          });
      }
    }
  }


  if (!isSubmitted) {
    return (
      <div className="Survey form-container">
        <Box display="flex" alignItems="center">
          <Typography component="h1" variant="h5">
            Please select your current mood.
          </Typography>
        </Box>

        <form noValidate>

          <Box display="flex" justifyContent="space-between" alignItems="center" className="mood-container">

            {/* BAD */}
            <Box
              display="flex"
              flexGrow="1"
              justifyContent="center"
              className={`mood-box ${selectedIdx === 0 ? "selected" : ""}`}
              onClick={() => handleSelectionChange(0)}
            >
              <MoodBadIcon className="mood-icon" />
            </Box>

            {/* NEUTRAL */}
            <Box
              display="flex"
              flexGrow="1"
              justifyContent="center"
              className={`mood-box ${selectedIdx === 1 ? "selected" : ""}`}
              onClick={() => handleSelectionChange(1)}
            >
              <NeutralIcon className="mood-icon" />
            </Box>

            {/* GOOD */}
            <Box
              display="flex"
              flexGrow="1"
              justifyContent="center"
              className={`mood-box ${selectedIdx === 2 ? "selected" : ""}`}
              onClick={() => handleSelectionChange(2)}
            >
              <SentimentVerySatisfiedIcon className="mood-icon" />
            </Box>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={ handleSubmit }
            disabled={selectedIdx === -1 }
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }


  return (
    <div className="Survey form-container">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography component="h1" variant="h5">
          Thank you! See you { moment().isoWeekday() === 5 ? <span>monday</span> : <span>tomorrow</span> }!
        </Typography>

        <SentimentVerySatisfiedIcon />
      </Box>
    </div>
  );
};

export default Survey;
