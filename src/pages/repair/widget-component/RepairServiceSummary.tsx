import React, {useEffect, useCallback} from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Card } from './'
import { Button } from '../../../components'

type Props = {
  repairWidgetData: any;
  caseKey: number;
  themeCol: string;
  step: number;
  handleStep: (step:number) => void;
}


const RepairServiceSummary = ({repairWidgetData, caseKey, themeCol, step, handleStep}: Props) => {

  const ChooseNextStep = () => {
    handleStep(step+1)
  }

  const onKeyPress = useCallback((event) => {
    if(event.key === 'Enter' && step === 9) {
      if (caseKey === 0) {
        handleStep(11)
      } else {
        ChooseNextStep()
      }
    }
  }, [step, caseKey]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [step])

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Card className='repair-service-summary-card'>
        <div className='repair-choose-device-container'>
          <Typography className='repair-service-summary-title'>
            Repair Service Summary
          </Typography>
          <Grid container className='repair-service-summary-detail-container' spacing={3}>
            <Grid item xs={12} sm={6} className='every-container'>
              <Typography className='topic'>Your Information</Typography>
              <Typography className='details'>
                {repairWidgetData.contactDetails.firstName + ' ' + repairWidgetData.contactDetails.lastName}
              </Typography>
              <Typography className='details'>{repairWidgetData.contactDetails.email}</Typography>
              <Typography className='details'>{repairWidgetData.contactDetails.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='every-container'>
              <Typography className='topic'>Preferred Contact Method</Typography>
              <Typography className='details'>{repairWidgetData.receiveQuote.method}</Typography>
            </Grid>
          </Grid>
          <Grid container className='repair-service-summary-detail-container' spacing={3}>
            <Grid item xs={12} sm={6} className='every-container'>
              <Typography className='topic'>Delivery Method</Typography>
              <Typography className='details' style={{color: themeCol}}>{repairWidgetData.deliveryMethod.method}</Typography>
              {caseKey === 1 && <Typography className='details bolder'>Pick-Up From</Typography>}
              {caseKey === 0 && <Typography className='details bolder'>Send To</Typography>}
              {caseKey > 0 && <Typography className='details'>{repairWidgetData.bookData[caseKey].address}</Typography>}
              {caseKey === 0 && <Typography className='details'>{repairWidgetData.bookData[caseKey].sendTo}</Typography>}
              {caseKey === 0 && <Typography className='details bolder'>Return To</Typography>}
              {caseKey === 0 && <Typography className='details'>{repairWidgetData.contactDetails.address1}</Typography>}
              {caseKey > 0 && <Typography className='details'>
                {
                  repairWidgetData.bookData[caseKey].week + ', ' + 
                  repairWidgetData.bookData[caseKey].month + ' ' + 
                  repairWidgetData.bookData[caseKey].day + ', ' + 
                  repairWidgetData.bookData[caseKey].year + ' at ' + 
                  repairWidgetData.bookData[caseKey].time
                }
              </Typography>}
            </Grid>
            {repairWidgetData.message && <Grid item xs={12} sm={6} className='every-container'>
              <Typography className='topic'>Message</Typography>
              <Typography className='details'>{repairWidgetData.message}</Typography>
            </Grid>}
          </Grid>
          <div className='repair-service-summary-detail-container'>
            <div className='repair-service-summary-flex-container bordered'>
              <Typography className='topic'>Device</Typography>
              <Typography className='topic'>Repair Service</Typography>
            </div>
            {repairWidgetData.deviceBrand && repairWidgetData.deviceBrand.map((item:any, index:number) => {
              return (
                <React.Fragment key={index}>
                  {repairWidgetData.chooseRepair[index].map((chooseItem:any, chooseIndex:number) => {
                    return (
                      <div className='repair-service-summary-flex-container' key={chooseIndex}>
                        <Typography className='details'>
                          {item.name + ' ' + repairWidgetData.deviceModel[index].name}
                        </Typography>
                        <Typography className='details'>{chooseItem.name}</Typography>
                      </div>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </div>
          <div className='repair-choose-device-container'>            
            {caseKey > 0 && <Button 
              title='Schedule Appointment' bgcolor={themeCol} borderR='20px' maxWidth='400px' 
              height='30px' fontSize='17px' margin='0 auto' onClick={ChooseNextStep}
            />}
            {caseKey === 0 && <Button 
              title='Request Quote' bgcolor={themeCol} borderR='20px' maxWidth='400px' 
              height='30px' fontSize='17px' margin='0 auto' onClick={()=>handleStep(11)}
            />}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default RepairServiceSummary
