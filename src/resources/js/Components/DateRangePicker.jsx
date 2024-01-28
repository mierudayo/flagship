import { useState, useEffect } from 'react';

import ClearAllIcon from '@mui/icons-material/ClearAll';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';

import DateInput from '@/Components/Form/DateInput';
import FormLabel from '@/Components/Form/FormLabel';
import { formatDate } from '@/Utils/dateHelper';


export default function DateRangePicker({ dateColumnLabel, submit, data, setData, errors }) {
  const urlParams = route().params;

  useEffect(() => {
    const startDate = urlParams.start_date || '';
    const endDate   = urlParams.end_date || '';

    const initRangeStr = lastClickedChip === '' ? `${startDate} ～ ${endDate}` : lastClickedChip;

    setRangeLabel(initRangeStr);
  }, [urlParams.start_date, urlParams.end_date]);

  const iconStyle = {
    fontSize: "1.5rem",
    marginRight: "4px",
    color: "#888",
  };

  const dateRangePickerInnerStyle = {
    minWidth: '320px',
    minHeight: '240px',
    padding: '16px'
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [rangeLabel, setRangeLabel] = useState('');
  const [lastClickedChip, setLastClickedChip] = useState('');

  const getTodayRange = () => {
    const today = new Date();

    return { startDate: formatDate(today), endDate: formatDate(today), rangeLabel: '今日' }
  }

  const getThisMonthRange = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
      startDate: formatDate(firstDayOfMonth),
      endDate: formatDate(lastDayOfMonth),
      rangeLabel: '今月'
    };
  }

  const getLastMonthRange = () => {
    const today = new Date();
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    return {
      startDate: formatDate(firstDayOfLastMonth),
      endDate: formatDate(lastDayOfLastMonth),
      rangeLabel: '先月'
    };
  }

  const getThisYearRange = () => {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const lastDayOfYear  = new Date(today.getFullYear(), 11, 31);

    return {
      startDate: formatDate(firstDayOfYear),
      endDate: formatDate(lastDayOfYear),
      rangeLabel: '今年',
    }
  }

  const clearDateInputs = () => {
    return { startDate: '', endDate: '' }
  }

  const rangeFunctions = {
    clear: clearDateInputs,
    today: getTodayRange,
    this_month: getThisMonthRange,
    last_month: getLastMonthRange,
    this_year: getThisYearRange,
  };

  const handleClickChangeRange = (range) => {
    const { startDate, endDate, rangeLabel } = rangeFunctions[range]();

    setData({
      ...data,
      start_date: startDate,
      end_date: endDate,
    })

    setLastClickedChip(rangeLabel);
  }

  const handleChangeStartDate = (e) => {
    setData('start_date', e.target.value);
    setLastClickedChip('');
  }

  const handleChangeEndDate = (e) => {
    setData('end_date', e.target.value);
    setLastClickedChip('');
  }

  const handleSubmit = (e) => {
    setAnchorEl(null);
    submit(e);
  }

  return (
    <>
      <button
        className="btn btn-secondary with-icon u-mr-3"
        onClick={handleClick}
      >
        <div className="u-flex u-items-center">
          <DateRangeIcon style={iconStyle} />
          <div>期間: {rangeLabel}</div>
        </div>
      </button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <div style={dateRangePickerInnerStyle}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-start"
            sx={{ marginBottom: 1 }}
          >
            <Chip
              label="今日"
              color={lastClickedChip === '今日' ? 'info': 'default'}
              onClick={() => {
                handleClickChangeRange('today');
              }}
            />
            <Chip
              label="今月"
              color={lastClickedChip === '今月' ? 'info': 'default'}
              onClick={() => {
                handleClickChangeRange('this_month');
              }}
            />
            <Chip
              label="先月"
              color={lastClickedChip === '先月' ? 'info': 'default'}
              onClick={() => {
                handleClickChangeRange('last_month');
              }}
            />
            <Chip
              label="今年"
              color={lastClickedChip === '今年' ? 'info': 'default'}
              onClick={() => {
                handleClickChangeRange('this_year');
              }}
            />
          </Stack>

          <div className="u-mr-2">
            <form onSubmit={handleSubmit}>
              <FormLabel htmlFor="start_date" label={dateColumnLabel} />
              <div className="u-flex">
                <DateInput
                  id="start_date"
                  value={data.start_date}
                  onChange={handleChangeStartDate}
                  error={errors.start_date}
                />
                <span className="u-mx-1">~</span>
                <DateInput
                  id="end_date"
                  value={data.end_date}
                  onChange={handleChangeEndDate}
                  error={errors.end_date}
                  className="u-mr-1"
                />
                <IconButton onClick={() => handleClickChangeRange('clear')}>
                  <ClearAllIcon />
                </IconButton>
              </div>
              <button type="submit" className="btn btn-primary u-mt-3">
                適用
              </button>
            </form>
          </div>
        </div>
      </Menu>
    </>
  );
}
