import React, {useState, useEffect, useCallback} from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { Button } from '../../../components'
import RepairSummary from './RepairSummary'

type Props = {
  data: any;
  subDomain?: string;
  step: number;
  handleStep: (step:number) => void;
  handleChangeChooseData: (step:number, chooseData:any) => void;
  repairWidgetData: any;
  caseKey: number;
}

const UsefulInfo = ({data, subDomain, step, handleStep, handleChangeChooseData, repairWidgetData, caseKey}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`)
  const iPhoneWhole = require(`../../../assets/${subDomain}/mock-data/repair-widget/device-model/iPhone-whole.png`)
  const themeCol = mainData.colorPalle.themeColor

  const [message, setMessage] = useState('')

  const ChooseNextStep = () => {
    handleChangeChooseData(8, message)
    handleStep(step+1)
  }

  useEffect(() => {
    setMessage(repairWidgetData.message)
  }, [repairWidgetData])

  const onKeyPress = useCallback((event) => {
    if(event.key === 'Enter' && step === 8) {
      ChooseNextStep();
    }
  }, [step, message]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [step, message])

  return (
    <div>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography className="repair-widget-title">
            {data.title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className='' spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <div className='repair-choose-device-container'>
              <div className='useful-textarea-div'>
                <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder={data.placeholder} className='useful-textarea' />
              </div>
            </div>
            <div className='repair-card-button'>
              <Button 
                title='Next' bgcolor={themeCol} borderR='20px' width='120px' 
                height='30px' fontSize='17px' onClick={ChooseNextStep}
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
              showInfo={true}
              caseKey={caseKey}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default UsefulInfo
