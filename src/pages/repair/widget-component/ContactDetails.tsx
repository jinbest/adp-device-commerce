import React, {useState, useEffect, useCallback} from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Card } from './'
import { InputComponent, Button, PhoneInput } from '../../../components'
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

const ContactDetails = ({data, subDomain, step, handleStep, handleChangeChooseData, repairWidgetData, caseKey}: Props) => {
  const mainData = require(`../../../assets/${subDomain}/Database.js`)
  const iPhoneWhole = require(`../../../assets/${subDomain}/mock-data/repair-widget/device-model/iPhone-whole.png`)
  const themeCol = mainData.colorPalle.themeColor

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address1, setStreetAddress1] = useState('')
  const [address2, setStreetAddress2] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [disableStatus, setDisableStatus] = useState(true);

  useEffect(() => {
    setFirstName(repairWidgetData.contactDetails.firstName);
    setLastName(repairWidgetData.contactDetails.lastName);
    setEmail(repairWidgetData.contactDetails.email);
    setPhone(repairWidgetData.contactDetails.phone);
    setStreetAddress1(repairWidgetData.contactDetails.address1);
    setStreetAddress2(repairWidgetData.contactDetails.address2);
    setCountry(repairWidgetData.contactDetails.country);
    setCity(repairWidgetData.contactDetails.city);
    setProvince(repairWidgetData.contactDetails.province);
    setPostalCode(repairWidgetData.contactDetails.postalCode);
  }, [repairWidgetData, step])

  const ChooseNextStep = () => {
    handleChangeChooseData(6, { 
      firstName: firstName, 
      lastName: lastName, 
      email: email, 
      phone: phone,
      address1: address1,
      address2: address2,
      country: country,
      city: city,
      province: province,
      postalCode: postalCode
    })
    handleStep(step+1)
  }

  const onKeyPress = useCallback((event) => {
    if(event.key === 'Enter' && !disableStatus && step === 6) {
      ChooseNextStep()
    }
  }, [step, firstName, lastName, email, phone, address1, address2, country, city, province, postalCode, disableStatus]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [step, firstName, lastName, email, phone, address1, address2, country, city, province, postalCode, disableStatus])

  useEffect(() => {
    setDisableStatus(true);
    if ( firstName && lastName && email && phone && ((caseKey===0 && address1) || (caseKey>0)) ) {
      setDisableStatus(false)
    }
  }, [firstName, lastName, email, phone, address1, caseKey])

  const handleChangeFirstName = (val:string) => {
    setFirstName(val)
  }

  const handleChangeLastName = (val:string) => {
    setLastName(val)
  }

  const handleChangeEmail = (val:string) => {
    setEmail(val)
  }

  const handleChangeAddress1 = (val:string) => {
    setStreetAddress1(val)
  }

  const handleChangeAddress2 = (val:string) => {
    setStreetAddress2(val)
  }

  const handleChangeCountry = (val:string) => {
    setCountry(val)
  }

  const handleChangeCity = (val:string) => {
    setCity(val)
  }

  const handleChangeProvince = (val:string) => {
    setProvince(val)
  }

  const handleChangePostalCode = (val:string) => {
    setPostalCode(val)
  }

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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputComponent value={firstName} placeholder={data.placeholder.firstName} handleChange={(e)=>{handleChangeFirstName(e.target.value)}} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputComponent value={lastName} placeholder={data.placeholder.lastName} handleChange={(e)=>{handleChangeLastName(e.target.value)}} />
                </Grid>
                <Grid item xs={12}>
                  <InputComponent value={email} placeholder={data.placeholder.emailAdd} handleChange={(e)=>{handleChangeEmail(e.target.value)}} />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput handleSetPhone={setPhone} val={phone} placeholder={data.placeholder.phoneNum} />
                </Grid>
              </Grid>
            </div>
            {caseKey > 0 && <div className='repair-choose-device-container'>
              <Button 
                title='Book an Appointment' bgcolor={themeCol} borderR='20px' maxWidth='300px' 
                height='30px' fontSize='17px' margin='0 auto 10px' onClick={ChooseNextStep} disable={disableStatus}
              />
              <Button 
                title='Request a Quote' bgcolor={themeCol} borderR='20px' maxWidth='300px' 
                height='30px' fontSize='17px' margin='0 auto' onClick={()=>{handleStep(11)}} disable={disableStatus}
              />
            </div>}
            {caseKey === 0 && <div className='repair-choose-device-container'>
              <Grid container spacing={2}>                
                <Grid item xs={12}>
                  <InputComponent value={address1} placeholder={data.placeholder.address1} handleChange={(e)=>{handleChangeAddress1(e.target.value)}} />
                </Grid>
                <Grid item xs={12}>
                <InputComponent value={address2} placeholder={data.placeholder.address2} handleChange={(e)=>{handleChangeAddress2(e.target.value)}} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputComponent value={country} placeholder={data.placeholder.country} handleChange={(e)=>{handleChangeCountry(e.target.value)}} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputComponent value={city} placeholder={data.placeholder.city} handleChange={(e)=>{handleChangeCity(e.target.value)}} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputComponent value={province} placeholder={data.placeholder.province} handleChange={(e)=>handleChangeProvince(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputComponent value={postalCode} placeholder={data.placeholder.postalCode} handleChange={(e)=>{handleChangePostalCode(e.target.value)}} />
                </Grid>
              </Grid>
            </div>}
            {caseKey === 0 && <div className='repair-card-button'>
              <Button 
                title='Next' bgcolor={themeCol} borderR='20px' width='120px' 
                height='30px' fontSize='17px' onClick={ChooseNextStep} disable={disableStatus}
              />
              <p>or press ENTER</p>
            </div>}
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

export default ContactDetails
