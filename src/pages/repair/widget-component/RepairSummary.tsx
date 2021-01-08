import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'

/* eslint-disable */
type Props = {
  repairWidgetData: any;
  handleChangeChooseData: (step:number, chooseData:any) => void;
  step: number;
  themeCol: string;
  subDomain?: string;
  caseKey: number;
  showInfo?: boolean
}

const RepairSummary = ({repairWidgetData, handleChangeChooseData, step, themeCol, subDomain, caseKey, showInfo}: Props) => {  
  const iPhoneWhole = require(`../../../assets/${subDomain}/mock-data/repair-widget/device-model/iPhone-whole.png`);

  const handleTrashSummary = (countNum:number, serviceNum:number) => {
    console.log(repairWidgetData.deviceBrand[countNum].name);
    console.log(repairWidgetData.deviceModel[countNum].name);
    console.log(repairWidgetData.chooseRepair[countNum][serviceNum].name);
    let cntDeviceCounter = repairWidgetData.deviceCounter,
      cntDeviceBrand = repairWidgetData.deviceBrand,
      cntDeviceModel = repairWidgetData.deviceModel,
      cntChooseRepair = repairWidgetData.chooseRepair[countNum];
    cntChooseRepair.splice(serviceNum, 1);
    console.log(cntChooseRepair);
    handleChangeChooseData(step, {data: [...cntChooseRepair], counter: countNum+1})
  }

  return (
    <div className='repair-choose-device-container'>
      <Typography className='topic-title'>Repair summary</Typography>
      <div className='repair-summary-content-div'>
        {repairWidgetData.deviceBrand && repairWidgetData.deviceBrand.map((item:any, index:number) => {
          return (
            <React.Fragment key={index}>
              {repairWidgetData.chooseRepair[index].map((chooseItem:any, chooseIndex:number) => (
                <div key={chooseIndex} className='repair-summary-div'>
                  <DeleteOutlineOutlinedIcon 
                    className='repair-trash-icon' 
                    style={{color: themeCol}}
                    onClick={()=>{handleTrashSummary(index, chooseIndex)}}
                  />
                  <div className='repair-summary-img'><img src={iPhoneWhole.default} /></div>
                  <div>
                    <Typography className='repair-summary-title'>
                      {item.name + ' ' + repairWidgetData.deviceModel[index].name}
                    </Typography>
                    <Typography className='repair-summary-service'>Repair Service:</Typography>
                    <p className='repair-summary-service-child'>{chooseItem.name}</p>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )
        })}
        {showInfo && <div className='repair-summary-div'>
          <div>
            <Typography className='repair-summary-title'>{repairWidgetData.deliveryMethod.method}</Typography>
            {caseKey === 1 && <Typography className='repair-summary-service'>Pick Up From</Typography>}
            {caseKey === 0 && <Typography className='repair-summary-service'>Send To</Typography>}
            {caseKey > 0 && <p className='repair-summary-service-child'>{repairWidgetData.bookData[caseKey].address}</p>}
            {caseKey === 0 && <p className='repair-summary-service-child' style={{marginBottom: '15px'}}>{repairWidgetData.bookData[caseKey].sendTo}</p>}
            {caseKey === 0 && <Typography className='repair-summary-service'>Return To</Typography>}
            {caseKey === 0 && <p className='repair-summary-service-child'>
              {repairWidgetData.contactDetails.address1}
            </p>}
            {caseKey > 0 && <p className='repair-summary-service-child'>
              {
                repairWidgetData.bookData[caseKey].week + ', ' + 
                repairWidgetData.bookData[caseKey].month + ' ' + 
                repairWidgetData.bookData[caseKey].day + ', ' + 
                repairWidgetData.bookData[caseKey].year + ' at ' + 
                repairWidgetData.bookData[caseKey].time
              }
            </p>}
          </div>
        </div>}
      </div>
    </div>
  )
}

export default RepairSummary;