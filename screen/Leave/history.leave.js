import React, {
    Component
} from 'react'

import { 
    Container, 
    Text,
    View, 
    Item, 
    Label, 
    Input, 
    Row, 
    Col, 
    Content, 
    Picker, 
    Button} from 'native-base'

import Icon from 'react-native-vector-icons/Feather'

// constant
import color from '../../constant/colors.constant'
import style from '../../constant/style.constant'
import leave from '../../constant/leave.constant'

export default class History extends Component {
    render () {
        return (
            <Container>
                <Content>
                    <View style={[style.container]}>
                        <Row style={style.mb20}>
                            <Col style={[style.mr10]}>
                                <View>
                                    <Item>
                                        <Label style={{color: color.placeholder}}>Start Date</Label>
                                        <Input />
                                        <Icon active name='calendar' style={[style.h2, style.placeholder, style.textPlaceholder]}/>
                                    </Item>
                                </View>
                            </Col>
                            <Col style={[style.ml10]}>
                                <View>
                                    <Item>
                                        <Label style={{color: color.placeholder}}>Start Date</Label>
                                        <Input />
                                        <Icon active name='calendar' style={[style.h2, style.placeholder, style.textPlaceholder]}/>
                                    </Item>
                                </View>
                            </Col>
                        </Row>
                        <Row style={style.mb20}>
                            <Col>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={[style.textPlaceholder]}
                                        placeholder="Select your SIM"
                                        placeholderStyle={[style.textPlaceholder]}
                                        placeholderIconColor="#007aff"
                                    >
                                        <Picker.Item label="Wallet" value="key0" />
                                        <Picker.Item label="ATM Card" value="key1" />
                                        <Picker.Item label="Debit Card" value="key2" />
                                        <Picker.Item label="Credit Card" value="key3" />
                                        <Picker.Item label="Net Banking" value="key4" />
                                    </Picker>
                                    </Item>
                            </Col>
                        </Row>
                        <Button style={[style.buttonPrimary]}>
                            <Text style={[style.width100, style.textCenter, style.textButton, style.mt10, style.mb10]}>Search</Text>
                        </Button>
                    </View>
                    <View>
                        <Card>
                            <CardItem>
                                <Text style={style.h3}>Casual Leaves</Text>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
            </Container>
        )
    }
}