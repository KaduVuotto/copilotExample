import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableOpacity, Animated, TextInput } from 'react-native';
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
import Icon from 'react-native-vector-icons/Feather'

const CopilotText = walkthroughable(Text);
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);

const StepNumberComponent = ({
  isFirstStep,
  isLastStep,
  currentStep,
  currentStepNumber,
}) => (
    <View style={{ backgroundColor: '#226dc3', height: 25, width: 25, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ backgroundColor: 'white', height: 20, width: 20, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#226dc3' }}>
          {currentStepNumber}
        </Text>
      </View>
    </View>
  );

const TooltipComponent = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels,
}) => (
    <View style={{ minHeight: 80, alignItems: 'stretch', justifyContent: 'space-evenly' }}>
      <Text style={{ color: '#226dc3' }}>{currentStep.text}</Text>
      <View style={{
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {
          !isLastStep ?
            <TouchableOpacity onPress={handleStop}>
              <Text style={{ color: '#226dc3', fontWeight: 'bold' }}>{labels.skip || 'Skip'}</Text>
            </TouchableOpacity>
            : null
        }
        {
          !isFirstStep ?
            <TouchableOpacity onPress={handlePrev}>
              <Text style={{ color: '#226dc3', fontWeight: 'bold' }}>{labels.previous || 'Previous'}</Text>
            </TouchableOpacity>
            : null
        }
        {
          !isLastStep ?
            <TouchableOpacity onPress={handleNext}>
              <Text style={{ color: '#226dc3', fontWeight: 'bold' }}>{labels.next || 'Next'}</Text>
            </TouchableOpacity> :
            <TouchableOpacity onPress={handleStop}>
              <Text style={{ color: '#226dc3', fontWeight: 'bold' }}>{labels.finish || 'Finish'}</Text>
            </TouchableOpacity>
        }
      </View>
    </View>
  );
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondStepActive: true,
      input: ''
    };
  }

  componentDidMount() {
    this.props.copilotEvents.on('stepChange', this.handleStepChange);
    this.props.start();
  }

  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
    console.log(step)
  }

  render() {
    const CustomComponent = ({ copilot, value }) => (
      <View {...copilot} style={{ height: 50, width: '95%', backgroundColor: '#cecece' }}>
        <TextInput
          placeholder={'Teste'}
          value={value}
          onChangeText={value => this.setState({ input: value })}
          ref={ref => { this._inputElement = ref }}
        />
      </View>
    );

    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 60
      }}>
        <CopilotStep
          text="This is a hello world example!"
          order={1}
          name="hello"
        >
          <WalkthroughableText style={{
            flex: 1,
            maxHeight: 100,
            fontSize: 28,
            padding: 10,
          }}>
            {'Welcome to the demo of\n"React Native Copilot"'}
          </WalkthroughableText>
        </CopilotStep>

        <CopilotStep
          text="This is a input example!"
          order={2}
          name="input"
          ref={ref => { this._copilotInput = ref }}
        >
          <CustomComponent value={this.state.input} />
        </CopilotStep>

        <CopilotStep
          active={this.state.secondStepActive}
          text="This is a image example!"
          order={3}
          name="Image"
        >
          <WalkthroughableImage source={require('./src/perfil.png')} style={{ width: 140, height: 140 }} />
        </CopilotStep>
        <View style={{ marginTop: 26 }}>
          <Button title='Começar' onPress={() => { this.props.start(), this.setState({ secondStepActive: true }) }} />
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <CopilotStep
            text="This is a icon1 example!"
            order={4}
            name="Icon1"
          >
            <WalkthroughableText style={{
              flex: 1,
              textAlign: 'center',
              paddingBottom: 10
            }} >
              <Icon name={'bell'} size={38} />
            </WalkthroughableText>
          </CopilotStep>
          <CopilotStep
            text="This is a icon2 example!"
            order={5}
            name="Icon2"
          >
            <WalkthroughableText style={{
              flex: 1,
              textAlign: 'center',
              paddingBottom: 10
            }}>
              <Icon name={'phone-call'} size={38} />
            </WalkthroughableText>
          </CopilotStep>

          <CopilotStep
            text="This is a Icon3 example!"
            order={6}
            name="Icon3"
          >
            <WalkthroughableText style={{
              flex: 1,
              textAlign: 'center',
              paddingBottom: 10
            }}>
              <Icon name={'radio'} size={38} />
            </WalkthroughableText>
          </CopilotStep>
          <Icon name={'printer'} size={38} style={{
            flex: 1,
            textAlign: 'center',
            paddingBottom: 10
          }} />
          <Icon name={'rss'} size={38} style={{
            flex: 1,
            textAlign: 'center',
            paddingBottom: 10
          }} />
        </View>
      </View >
    );
  }
}
export default copilot({
  animated: true, // Can be true or false
  overlay: 'svg', // Can be either view or svg
  stepNumberComponent: StepNumberComponent,
  labels: {
    previous: "Anterior",
    next: "Próximo",
    skip: "Pular",
    finish: "Finalizar",
  },
  tooltipStyle: {
    borderRadius: 12,
    paddingTop: 10,
  },
  tooltipComponent: TooltipComponent,
  verticalOffset: 18,
  androidStatusBarVisible: false
})(App);