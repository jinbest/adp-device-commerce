import React, {useState, useEffect, useCallback} from 'react'
import { Card, PlusSVG } from './'
import { Grid, Typography } from '@material-ui/core'
import { Search, Button } from '../../../components'
import RepairSummary from './RepairSummary'

/* eslint-disable */
type Props = {
  data: any;
  stepName: string;
  step: number;
  subDomain?: string;
  handleStep: (step:number) => void;
  handleChangeChooseData: (step:number, chooseData:any) => void;
  repairWidgetData: any;
}

type ArrayProps = {
  array: any[];
}

const ChooseDevice = ({data, stepName, step, subDomain, handleStep, handleChangeChooseData, repairWidgetData}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`);
  const iPhoneWhole = require(`../../../assets/${subDomain}/mock-data/repair-widget/device-model/iPhone-whole.png`);
  const themeCol = mainData.colorPalle.themeColor;

  const [sliceNum, setSliceNum] = useState(5);
  const [plusVisible, setPlusVisible] = useState(true);
  const [itemTypes, setItemTypes] = useState<ArrayProps[]>([]);
  const [estimatedTimes, setEstimatedTimes] = useState<ArrayProps[]>([]);
  const [selected, setSelected] = useState(999);
  const [disableStatus, setDisableStatus] = useState(true);

  const handlePlus = () => {
    setSliceNum(data.images.length);
    setPlusVisible(false);
  }

  const ChooseNextStep = (i:number) => {
    if (i === 999 ){
      handleStep(step+1);
      return;
    }
    setSelected(i);
    handleChangeChooseData(step, data.images[i]);
    const timer = setTimeout(() => {
      setSelected(999);
      handleStep(step+1);
    }, 200);
    return () => clearTimeout(timer);
  }

  const onKeyPress = useCallback((event) => {
    if(event.key === 'Enter' && !disableStatus && (step === 2 || step === 4 || step === 5)) {
      handleStep(step+1);
    }
  }, [step, disableStatus]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [step, disableStatus]);

  const GotoNextStep = () => {
    ChooseNextStep(999);
  }

  const GobackFirst = () => {
    setSelected(999);
    handleStep(0);
  }

  useEffect(() => {
    if (step === 0) {
      for (let i = 0; i < data.images.length; i++) {
        if (data.images[i].name === repairWidgetData.deviceBrand.name) {
          setSelected(i);
          break;
        }
      }
    } else if (step === 1) {
      for (let i = 0; i < data.images.length; i++) {
        if (data.images[i].name === repairWidgetData.deviceModel.name) {
          setSelected(i);
          break;
        }
      }
    } else if (step === 2) {
      let cntTypes:any[] = data.types;
      for (let i = 0; i < cntTypes.length; i++) {
        cntTypes[i].bg = 'white';
        cntTypes[i].col = 'black';
        cntTypes[i].selected = false;
        for (let j = 0; j < repairWidgetData.chooseRepair.length; j++) {
          if (cntTypes[i].name === repairWidgetData.chooseRepair[j].name) {
            cntTypes[i].bg = themeCol;
            cntTypes[i].col = 'white';
            cntTypes[i].selected = true;
          }
        }
      }
      setItemTypes([...cntTypes])
    } else if (step === 4) {
      let cntTypes:any[] = data.types;
      for (let i = 0; i < cntTypes.length; i++) {
        cntTypes[i].bg = 'white';
        cntTypes[i].col = 'black';
        cntTypes[i].selected = false;
        if (cntTypes[i].name === repairWidgetData.deliveryMethod.method) {
          cntTypes[i].bg = themeCol;
          cntTypes[i].col = 'white';
          cntTypes[i].selected = true;
        }
      }
      setItemTypes([...cntTypes])
    } else if (step === 5) {
      let cntTypes:any[] = data.types;
      for (let i = 0; i < cntTypes.length; i++) {
        cntTypes[i].bg = 'white';
        cntTypes[i].col = 'black';
        cntTypes[i].selected = false;
        if (cntTypes[i].name === repairWidgetData.receiveQuote.method) {
          cntTypes[i].bg = themeCol;
          cntTypes[i].col = 'white';
          cntTypes[i].selected = true;
        }
      }
      setItemTypes([...cntTypes])
    }
  }, [step, repairWidgetData]);

  const toggleItemTypes = (i:number, stepN:string) => {
    if(stepN === 'deviceRepairs') {
      let cntTypes:any[] = itemTypes
      if (cntTypes[i].bg === 'white') {
        cntTypes[i].bg = themeCol
        cntTypes[i].col = 'white'
        cntTypes[i].selected = true
      } else {
        cntTypes[i].bg = 'white'
        cntTypes[i].col = 'black'
        cntTypes[i].selected = false
      }
      setItemTypes([...cntTypes])
      let preChooseRepairs:any[] = [];
      for (let i = 0; i < cntTypes.length; i++) {
        if (cntTypes[i].selected) {
          preChooseRepairs.push({name: cntTypes[i].name})
        }
      }
      handleChangeChooseData(step, {data: preChooseRepairs, counter: repairWidgetData.deviceCounter})
    } else {
      let cntItemTypes:any[] = itemTypes
      for (let u = 0; u < cntItemTypes.length; u++) {
        if (u === i) {
          cntItemTypes[u].bg = themeCol
          cntItemTypes[u].col = 'white'
          cntItemTypes[u].selected = true
          handleChangeChooseData(step, {method: cntItemTypes[u].name, caseKey: u})
        } else {
          cntItemTypes[u].bg = 'white'
          cntItemTypes[u].col = 'black'
          cntItemTypes[u].selected = false
        }
      }
      setItemTypes([...cntItemTypes])
    }
  }

  useEffect(() => {
    let cntArray:any[] = [], cntTypes:any[] = itemTypes
    if(cntTypes && stepName === 'deviceRepairs') {
      for (let i = 0; i < cntTypes.length; i++) {
        if (cntTypes[i].bg === themeCol) {
          cntArray.push({ name: cntTypes[i].name, estimate: cntTypes[i].estimate })
        }
      }
      setEstimatedTimes([...cntArray])
    }
  }, [itemTypes]);

  useEffect(() => {
    setDisableStatus(true);
    if (step === 2 && estimatedTimes.length > 0) {
      setDisableStatus(false);
    }
    if (step === 4 || step === 5) {
      const cntTypes:any[] = itemTypes;
      for (let i = 0; i < cntTypes.length; i++) {
        if (cntTypes[i].selected) {
          setDisableStatus(false);
          break;
        }
      }
    }
  }, [step, estimatedTimes, itemTypes]);

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
              {step < 3 && <div style={{width: '95%'}}>
                <Search 
                  color='rgba(0,0,0,0.8)' 
                  bgcolor='white' 
                  border='rgba(0,0,0,0.2)'
                  placeholder={data.placeholder}
                />
              </div>}
              <div className='widget-main-container'>

                {(stepName === 'deviceBrand') && <>
                  {data.images.slice(0,sliceNum).map((item:any, index:number) => {
                    return (
                      <div 
                        className='device-item-container' 
                        style={{background: selected === index ? 'rgba(0,0,0,0.1)' : 'white'}} 
                        key={index} 
                        onClick={() => ChooseNextStep(index)}
                      >
                        <img src={item.img} style={{maxWidth: '80%'}} />
                      </div>
                    )
                  })}
                  {plusVisible && <div className='device-item-container' onClick={handlePlus}>
                    <PlusSVG color='#BDBFC3' />
                  </div>}
                </>}

                {(stepName === 'deviceModel') && <>
                  {data.images && data.images.map((item:any, index:number) => {
                    return (
                      <div 
                        className='device-item-container' 
                        key={index} 
                        onClick={() => ChooseNextStep(index)}
                        style={{background: selected === index ? 'rgba(0,0,0,0.1)' : 'white'}} 
                      >
                        <div className='device-model-item'>
                          <p className='device-brand-subtitle'>{item.name}</p>
                          <img src={item.img} />
                        </div>
                      </div>
                    )
                  })}
                  <div className='device-item-container'>
                    <PlusSVG color='#BDBFC3' />
                  </div>
                </>}

                {(stepName === 'repairAnotherDevice') && 
                  <div className='repair-another-device'>
                    <Button title='Yes' bgcolor='white' borderR='20px' width='120px' height='30px' fontSize='17px' txcolor='black' onClick={GobackFirst} />
                    <Button title='No' bgcolor='white' borderR='20px' width='120px' height='30px' fontSize='17px' txcolor='black' onClick={GotoNextStep} />
                  </div>
                }

                {(stepName === 'deviceRepairs' || stepName === 'dropOffDevicce' || stepName === 'receiveQuote') && 
                  <>
                    {itemTypes && itemTypes.map((item:any, index:number) => {
                      return (
                        <div 
                          className='device-item-container' 
                          key={index} 
                          style={{backgroundColor: item.bg}} 
                          onClick={() => toggleItemTypes(index, stepName)}
                        >
                          <div className='device-repair-item'>
                            <p style={{ color: item.col }}>{item.name}</p>
                          </div>
                        </div>
                      )
                    })}
                  </>
                }

              </div>              
            </div>

            {(stepName === 'deviceRepairs' || stepName === 'dropOffDevicce' || stepName === 'receiveQuote') && 
              <div className='repair-card-button'>
                <Button 
                  title='Next' bgcolor={themeCol} borderR='20px' width='120px' 
                  height='30px' fontSize='17px' onClick={() => ChooseNextStep(999)} disable={disableStatus}
                />
                <p>or press ENTER</p>
              </div>
            }
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className='customized-card-height'>

            {step < 2 && <div className='repair-choose-device-container'>
              <Typography className='topic-title'>{data.mainTopic.title}</Typography>
              {data.mainTopic.content && data.mainTopic.content.map((item:any, index:number) => {
                return (
                  <Typography className='topic-content' key={index}>{item}</Typography>
                )
              })}
              {data.disableTopic.title && <Typography className='topic-title' style={{color: 'rgba(0,0,0,0.3)'}}>
                {data.disableTopic.title}
              </Typography>}
              {data.disableTopic.content && <Typography className='topic-content' style={{color: 'rgba(0,0,0,0.3)'}}>
                {data.disableTopic.content}
              </Typography>}
            </div>}

            {step === 2 && <div className='repair-choose-device-container'>
              <Typography className='topic-title'>{data.mainTopic.title}</Typography>
              {estimatedTimes && estimatedTimes.map((item:any, index:number) => {
                return (
                  <div key={index} className='estimate-times-div'>
                    <p className='estimate-title'>{item.name}</p>
                    <p className='estimate-content'>{item.estimate}</p>
                  </div>
                )
              })}
            </div>}

            {step === 3 && 
              <div className='repair-choose-device-container'>
                <Typography className='topic-title'>{data.mainTopic.title}</Typography>
                <Typography className='topic-content'>{data.mainTopic.content}</Typography>
              </div>
            }

            {(stepName === 'dropOffDevicce' || stepName === 'receiveQuote') && 
              <RepairSummary 
                repairWidgetData={repairWidgetData} 
                step={step} 
                handleChangeChooseData={handleChangeChooseData} 
                subDomain={subDomain} 
                themeCol={themeCol} 
                caseKey={0}
              />
            }

          </Card>
        </Grid>
      </Grid>      
    </div>
  )
}

export default ChooseDevice
