import React, {useState, useEffect, useCallback} from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { Button, CustomSelect, CustomCalendar, InputComponent } from '../../../components'
import CustomBookTime from './CustomBookTime'
import RepairSummary from './RepairSummary'

type Props = {
  data: any;
  subDomain?: string;
  step: number;
  handleStep: (step:number) => void;
  caseKey: number;
  handleChangeChooseData: (step:number, chooseData:any) => void;
  repairWidgetData: any;
}

const BookTime = ({data, subDomain, step, caseKey, handleStep, handleChangeChooseData, repairWidgetData}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`)
  const timezoneData = require(`../../../assets/${subDomain}/mock-data/timezoneList.js`)
  const iPhoneWhole = require(`../../../assets/${subDomain}/mock-data/repair-widget/device-model/iPhone-whole.png`)
  const timeZoneList = timezoneData.timezoneOptions;
  const themeCol = mainData.colorPalle.themeColor;
  const DAYS_OF_THE_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'];

  const [tzIndex, setTZIndex] = useState(0);
  const [timezone, setTimezone] = useState(timeZoneList[tzIndex].timezone)
  const [today, setToday] = useState(changeTimezone(new Date(), timezone));
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [week, setWeek] = useState(date.getDay());
  const [time, setTime] = useState(date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
  const [selectVal, setSelectVal] = useState('');
  const [address, setAddress] = useState('');
  const [sendToAddress, setSendToAddress] = useState('');
  const [mailInChecked, setMailinChecked] = useState(0);
  const [disableStatus, setDisableStatus] = useState(true);

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setWeek(date.getDay());
    setTime(date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }))
  }, [date]);
  
  useEffect(() => {
    setToday(changeTimezone(new Date(), timezone))
    setDate(changeTimezone(new Date(), timezone))
  }, [timezone])

  useEffect(() => {
    setTimezone(timeZoneList[tzIndex].timezone);
  }, [tzIndex]);

  useEffect(() => {
    if (caseKey === 0) {
      const cntMailinOption:any[] = data.select.location.mailInOption;
      setSendToAddress(cntMailinOption[mailInChecked].name);
      for (let i = 0; i < cntMailinOption.length; i++) {
        if (cntMailinOption[i].name === repairWidgetData.bookData[caseKey].sendTo) {
          setMailinChecked(i);
          setSendToAddress(repairWidgetData.bookData[caseKey].sendTo);
        }
      }
    } 
    else if (caseKey === 1 || caseKey === 3) {
      setAddress(repairWidgetData.bookData[caseKey].address);
    } 
    else {
      if (repairWidgetData.bookData[caseKey].address) {
        setSelectVal(repairWidgetData.bookData[caseKey].address);
      } else {
        setSelectVal(data.select.location.option[0]);
      }      
    }
  }, [repairWidgetData, step, caseKey, data]);

  const handleChangeAddress = (val:string) => {
    setAddress(val);
  }

  const handleChangeMailinAddress = (val:string, i:number) => {
    setMailinChecked(i);
    setSendToAddress(val);
  }

  function changeTimezone(date:Date, ianatz:string) {
    const invdate = new Date(date.toLocaleString('en-US', {
      timeZone: ianatz
    }));
    const diff = date.getTime() - invdate.getTime();
    return new Date(date.getTime() - diff);
  }

  const ChooseNextStep = () => {
    if (caseKey === 0) {
      handleChangeChooseData(7, { caseKey: caseKey, data: { sendTo: sendToAddress } });
    } else {
      handleChangeChooseData(7, {
        caseKey: caseKey, 
        data: { 
          address: caseKey === 2 ? selectVal : address, 
          time: time, 
          day: day, 
          month: MONTHS[month], 
          year: year, 
          week: DAYS_OF_THE_WEEK[week] 
        }
      });
    }    
    handleStep(step+1)
  }

  const onKeyPress = useCallback((event) => {
    if(event.key === 'Enter' && !disableStatus && step === 7) {
      ChooseNextStep();
    }
  }, [step, caseKey, sendToAddress, address, selectVal, time, day, month, year, week, disableStatus]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [step, caseKey, sendToAddress, address, selectVal, time, day, month, year, week, disableStatus])

  useEffect(() => {
    setDisableStatus(true);
    if (caseKey === 0 && sendToAddress) {
      setDisableStatus(false);
    }
    if (caseKey > 0 && (address || selectVal) && time && day && MONTHS[month] && year && DAYS_OF_THE_WEEK[week]) {
      setDisableStatus(false);
    }
  }, [caseKey, sendToAddress, address, selectVal, time, day, month, year, week])

  return (
    <div>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography className="repair-widget-title">
            {data.title[caseKey]}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={7}>
          <Card className='booking-card'>
            <div className='repair-choose-device-container'>
              <Typography className='repair-summary-title'>{data.select.location.title[caseKey]}</Typography>
              <div style={{marginBottom: '20px'}}>
                {caseKey === 2 && <CustomSelect value={selectVal} handleSetValue={setSelectVal} subDomain={subDomain} options={data.select.location.option} />}
                {(caseKey === 1 || caseKey === 3) && <InputComponent value={address} handleChange={(e)=>{handleChangeAddress(e.target.value)}} />}
                {caseKey === 0 && <div>
                  {data.select.location.mailInOption.map((item:any, index:number) => {
                    return (
                      <div key={index} className='select-mail-in-radio'>
                        <input 
                          type='radio' 
                          id={'radio'+index} 
                          name='region' 
                          value={item.name} 
                          onChange={()=>{handleChangeMailinAddress(item.name, index)}} 
                          checked={index===mailInChecked} 
                        />
                        <label htmlFor={'radio'+index}>{item.name}</label>
                      </div>
                    )
                  })}
                  <div className='select-mail-in-container'>
                    <div><u><p className='select-mail-in-text'>Hours</p></u></div>
                  </div>
                  {data.select.time.workingHours.map((item:any, index:number) => {
                    return (
                      <div key={index} className='select-mail-in-container'>
                        <div style={{width: '50%'}}><p className='select-mail-in-text'>{item[0]}</p></div>
                        <div style={{width: '50%'}}><p className='select-mail-in-text'>{item[1]}</p></div>
                      </div>
                    )
                  })}
                </div>}
              </div>
              {caseKey > 0 && <Typography className='repair-summary-title'>{data.select.time.title[caseKey]}</Typography>}
              {caseKey > 0 && <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomCalendar subDomain={subDomain} handleParentDate={setDate} timezone={timezone} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomBookTime 
                    themeCol={themeCol} 
                    title={DAYS_OF_THE_WEEK[week] + ', ' + MONTHS[month] + ' ' + day}
                    subDomain={subDomain}
                    timezoneIndex={tzIndex}
                    timeZoneList={timeZoneList}
                    defaultTimezone={timezoneData.defaultTimezone}
                    changeTimezone={setTZIndex}
                    changeBooktime={setTime}
                    selectYear={year}
                    selectMonth={month}
                    selectDay={day}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div style={{border: '1px solid rgba(0,0,0,0.1)', borderRadius: '20px', width: '100%', height: '30px', fontSize: '14px', display: 'flex', alignItems: 'center'}}>
                    <p style={{textAlign: 'center', margin: '0 10px'}}>You've selected {time} on {DAYS_OF_THE_WEEK[week]}, {MONTHS[month]} {day}, {year}</p>
                  </div>
                </Grid>
              </Grid>}
            </div>
            <div className='repair-card-button'>
              <Button 
                title='Next' bgcolor={themeCol} borderR='20px' width='120px' 
                height='30px' fontSize='17px' onClick={ChooseNextStep} disable={disableStatus}
              />
              <p>or press ENTER</p>
            </div>
          </Card>          
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className='repair-summary-card'>
            <RepairSummary 
              repairWidgetData={repairWidgetData} 
              step={step} 
              handleChangeChooseData={handleChangeChooseData} 
              subDomain={subDomain} 
              themeCol={themeCol} 
              caseKey={caseKey}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default BookTime
