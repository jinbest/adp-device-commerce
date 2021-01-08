import React from 'react'
import { ChooseDevice, BackSVG, ContactDetails, BookTime, UsefulInfo, RepairServiceSummary, QuoteComponent } from './widget-component'
import { inject, IWrappedComponent, observer } from 'mobx-react'
import { RepairWidgetStore } from '../../store/RepairWidgetStore'
import { computed } from 'mobx'

const stepList:string[] = [
  'deviceBrand',
  'deviceModel',
  'deviceRepairs',
  'repairAnotherDevice',
  'dropOffDevicce',
  'receiveQuote',
  'contactDetails',
  'bookTime',
  'usefulInfo',
  'repairServiceSummary',
  'quoteData'
]

/* eslint-disable */
type StoreProps = {  
  repairWidgetStore: RepairWidgetStore;
}
interface Props extends StoreProps {
  subDomain: string;
  handleStatus: (status:boolean) => void;
}

type MyState = {
  step: number;
}

@inject('repairWidgetStore')
@observer
class RepairWidget extends React.Component<Props, MyState> {
  static defaultProps = {} as StoreProps;

  @computed
  get computedRepairWidgetData() {
    const cntRepairWidgetData = this.props.repairWidgetStore;
    return {
      deviceBrand: cntRepairWidgetData.deviceBrand,
      deviceModel: cntRepairWidgetData.deviceModel,
      chooseRepair: cntRepairWidgetData.chooseRepair,
      deviceCounter: cntRepairWidgetData.deviceCounter,
      deliveryMethod: cntRepairWidgetData.deliveryMethod,
      receiveQuote: cntRepairWidgetData.receiveQuote,
      contactDetails: cntRepairWidgetData.contactDetails,
      bookData: cntRepairWidgetData.bookData,
      message: cntRepairWidgetData.message,
      cntStep: cntRepairWidgetData.cntStep
    };
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      step: 0,
    };
    this.handleBackStep = this.handleBackStep.bind(this);
    this.handleChangeChooseData = this.handleChangeChooseData.bind(this);
  }

  componentDidMount() {
    const { handleStatus, repairWidgetStore } = this.props;
    handleStatus(false);
    this.setState({step: repairWidgetStore.cntStep});
  }

  handleBackStep() {
    const { repairWidgetStore } = this.props,
      cntStep:number = this.state.step;
    let cntDeviceBrand = repairWidgetStore.deviceBrand, 
      cntDeviceModel = repairWidgetStore.deviceModel,
      cntChooseRepair = repairWidgetStore.chooseRepair;
    const cntDeviceCounter = repairWidgetStore.deviceCounter;
    
    switch(cntStep) {
      case 1:
        if (cntDeviceBrand.length === cntDeviceCounter && cntDeviceCounter > 0) cntDeviceBrand.pop();
        if (cntDeviceModel.length === cntDeviceCounter && cntDeviceCounter > 0) cntDeviceModel.pop();
        repairWidgetStore.changeDeviceBrand(cntDeviceBrand);
        repairWidgetStore.changeDeviceModel(cntDeviceModel);
        repairWidgetStore.changeDeviceCounter(cntDeviceCounter-1);
        break;
      case 2:
        if (cntDeviceModel.length === cntDeviceCounter && cntDeviceCounter > 0) cntDeviceModel.pop();
        if (cntChooseRepair.length === cntDeviceCounter && cntDeviceCounter > 0) cntChooseRepair.pop();
        repairWidgetStore.changeDeviceModel(cntDeviceModel);
        repairWidgetStore.changeChooseRepair(cntChooseRepair);
        break;
      case 3:
        if (cntChooseRepair.length === cntDeviceCounter && cntDeviceCounter > 0) cntChooseRepair.pop();
        repairWidgetStore.changeChooseRepair(cntChooseRepair);
        break;
      case 4:
        repairWidgetStore.changeDeliveryMethod({});
        break;
      case 5:
        repairWidgetStore.changeDeliveryMethod({});
        repairWidgetStore.changeReceiveQuote({});
        break;
      case 6:
        repairWidgetStore.changeReceiveQuote({});
        repairWidgetStore.changeContactDetails({});
        break;
      case 7:
        repairWidgetStore.changeContactDetails({});
        for (let i = 0; i < 4; i++) {
          repairWidgetStore.changeBookData({ caseKey: i, data: {} });
        }
        break;
      case 8:
        for (let i = 0; i < 4; i++) {
          repairWidgetStore.changeBookData({ caseKey: i, data: {} });
        }
        repairWidgetStore.changeMessage('');
        break;
      case 9:
        repairWidgetStore.changeMessage('');
        break;
      default:
        break;
    }
    if (cntStep === 11) {
      if (repairWidgetStore.deliveryMethod.caseKey === 0) {
        repairWidgetStore.changeCntStep(9);
        this.setState({step: 9});
      } else {
        repairWidgetStore.changeCntStep(6);
        this.setState({step: 6});
      }  
    } else {
      repairWidgetStore.changeCntStep(cntStep-1);
      this.setState({step: cntStep-1});
    }  
  }

  handleStep(i:number) {
    const { repairWidgetStore } = this.props;
    this.setState({step: i});
    repairWidgetStore.changeCntStep(i);
  }

  handleChangeChooseData(i:number, chooseData:any) {
    const { repairWidgetStore } = this.props;
    switch(i) {
      case 0:
        let cntDeviceBrand = repairWidgetStore.deviceBrand, cntDeviceCounter = repairWidgetStore.deviceCounter;
        cntDeviceBrand.push(chooseData);
        repairWidgetStore.changeDeviceBrand(cntDeviceBrand);
        repairWidgetStore.changeDeviceCounter(cntDeviceCounter + 1);
        break;
      case 1:
        let cntDeviceModel = repairWidgetStore.deviceModel;
        cntDeviceModel.push(chooseData);
        repairWidgetStore.changeDeviceModel(cntDeviceModel);
        break;
      case 2:
        let cntChooseRepair = repairWidgetStore.chooseRepair;
        const counter = chooseData.counter;
        if (cntChooseRepair.length >= counter) {
          cntChooseRepair[counter-1] = chooseData.data;
        } else {
          cntChooseRepair.push(chooseData.data);
        }
        repairWidgetStore.changeChooseRepair(cntChooseRepair);
        break;
      case 4:
        repairWidgetStore.changeDeliveryMethod(chooseData);
        break;
      case 5:
        repairWidgetStore.changeReceiveQuote(chooseData);
        break;
      case 6:
        repairWidgetStore.changeContactDetails(chooseData);
        break;
      case 7:
        repairWidgetStore.changeBookData(chooseData);
        break;
      case 8:
        repairWidgetStore.changeMessage(chooseData);
        break;
      default:
        break;
    }
  }

  render() {
    const { subDomain } = this.props;
    const mockData = require(`../../assets/${subDomain}/mock-data/mockData.js`);
    const mainData = require(`../../assets/${subDomain}/Database.js`);
    const themeCol = mainData.colorPalle.themeColor;

    return (
      <div className='repair-widget Container'>
        { this.state.step > 0 && 
          <div className='back-to-top' onClick={this.handleBackStep}>
            <BackSVG color='#BDBFC3' />
          </div>
        }
        { this.state.step <= 5 && 
          <ChooseDevice 
            data={mockData.repairWidget[stepList[this.state.step]]} 
            handleStep={this.handleStep.bind(this)} 
            handleChangeChooseData={this.handleChangeChooseData.bind(this)}
            stepName={stepList[this.state.step]} 
            step={this.state.step} 
            subDomain={subDomain} 
            repairWidgetData={this.computedRepairWidgetData}
          />
        }
        { this.state.step === 6 && 
          <ContactDetails 
            data={mockData.repairWidget[stepList[this.state.step]]} 
            subDomain={subDomain} 
            step={this.state.step} 
            handleStep={this.handleStep.bind(this)} 
            handleChangeChooseData={this.handleChangeChooseData.bind(this)} 
            repairWidgetData={this.computedRepairWidgetData}
            caseKey={this.computedRepairWidgetData.deliveryMethod.caseKey}
          />
        }
        { this.state.step === 7 && 
          <BookTime 
            data={mockData.repairWidget[stepList[this.state.step]]} 
            subDomain={subDomain} 
            step={this.state.step} 
            caseKey={this.computedRepairWidgetData.deliveryMethod.caseKey} 
            handleStep={this.handleStep.bind(this)} 
            handleChangeChooseData={this.handleChangeChooseData.bind(this)} 
            repairWidgetData={this.computedRepairWidgetData}
          />
        }
        { this.state.step === 8 && 
          <UsefulInfo 
            data={mockData.repairWidget[stepList[this.state.step]]} 
            subDomain={subDomain} 
            step={this.state.step} 
            handleStep={this.handleStep.bind(this)} 
            handleChangeChooseData={this.handleChangeChooseData.bind(this)} 
            repairWidgetData={this.computedRepairWidgetData}
            caseKey={this.computedRepairWidgetData.deliveryMethod.caseKey} 
          />
        }
        { this.state.step === 9 &&
          <RepairServiceSummary 
            themeCol={themeCol}
            repairWidgetData={this.computedRepairWidgetData}
            caseKey={this.computedRepairWidgetData.deliveryMethod.caseKey}
            step={this.state.step} 
            handleStep={this.handleStep.bind(this)}
          />
        }
        { this.state.step === 10 &&
          <QuoteComponent
            data={mockData.repairWidget[stepList[this.state.step]]}
            repairWidgetData={this.computedRepairWidgetData}
            quoteKey={1}
          />
        }
        { this.state.step === 11 &&
          <QuoteComponent
            data={mockData.repairWidget[stepList[10]]}
            repairWidgetData={this.computedRepairWidgetData}
            quoteKey={0}
          />
        }
      </div>
    )
  }
}

export default RepairWidget as typeof RepairWidget & IWrappedComponent<Props>;