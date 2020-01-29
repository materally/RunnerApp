import React, { Component } from 'react';
import { AsyncStorage, ScrollView, ActivityIndicator, View, StyleSheet, Text, Linking, Modal, TouchableOpacity } from 'react-native';
import { Header, Input, Button, Icon, ListItem, Card, Overlay } from 'react-native-elements';
import Loader from './components/Loader';
import product_categories from '../product_categories.json'
import products from '../products.json'


export default class PartnerScreen extends Component {
    static navigationOptions = {
        title: "McDelivery McDonald's",
        header: null
    }
    
    constructor(props) {
        super(props);
        this.state = {
            save: false,
            view: 'categories',
            productTitle: '',
            productsTitle: '',
            qtyValue: 1,
            loading: true,
            productsState: [],
            product_categoriesState: [],
            productQtyVisible: false
        }
    }

    componentWillMount(){
        this.loadProductCategories();
        this.loadProducts();
    }

    changeLoader = () => {
        this.setState({ loading: (this.state.loading ? false : true ) })
    }

    loadProducts(){
        this.setState({
            productsState: products,
            loading:false
        })
    }

    loadProductCategories(){
        this.setState({
            product_categoriesState: product_categories,
            loading:false
        })
    }

    renderProductCategories = () => {
        const product_categories = this.state.product_categoriesState.map((cat, index) =>
            <ListItem
                key={index}
                title={cat.name}
                badge={{ value: cat.badge, textStyle: { color: 'white', fontSize: 14, fontWeight: 'bold' }, containerStyle: {} }}
                onPress={() => { this.setState({ view: 'products', productsTitle: cat.name }) }}
                titleStyle={{ fontWeight: 'bold', flexWrap: "wrap" }}
                containerStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#cecece'
                }}
            />
        );
        return (
            <View style={{ paddingTop: 25 }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#0984e3' }}>Categories</Text>
                </View>
                <View>
                    {product_categories}
                </View>
            </View>
        )
    }

    renderProducts = () => {
        const products = this.state.productsState.map((product, index) =>
            <ListItem
                key={index}
                title={product.product_name}
                leftAvatar={{ rounded: true, source: {uri: (product.image === null) ?  "https://loremflickr.com/50/50/food" : product.image }}}
                onPress={() => { this.setState({ view: 'product', productTitle: product.product_name }) }}
                titleStyle={{ fontWeight: 'bold', flexWrap: "wrap" }}
                containerStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#cecece'
                }}
            />
        )
        return (
            <View style={{ paddingTop: 25 }}>
                <View style={{ position: 'relative', paddingBottom:10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#0984e3' }}>{this.state.productsTitle}</Text>
                    <TouchableOpacity  onPress={ ()=>{ this.setState({ view: 'categories' }) } } style={{ position:'absolute', left:20, width:25, height:25 }} >
                        <Icon
                            name="arrow-back"
                            color="#0984e3"
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    {products}
                </View>
            </View>
        )
    }

    renderProduct = () => {
        const product_image = "https://www.mcdonalds.com/is/image/content/dam/usa/nutrition/items/iconic/desktop/t-mcdonalds-Big-Mac.jpg"
        return (
            <View style={{ paddingTop: 25 }}>
                <View style={{ position: 'relative', paddingBottom:10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#0984e3' }}>{this.state.productTitle}</Text>
                    <TouchableOpacity onPress={ ()=>{ this.setState({ view: 'products' }) } } style={{ position:'absolute', left:20, width:25, height:25 }} >
                        <Icon
                            name="arrow-back"
                            color="#0984e3"
                        />
                    </TouchableOpacity>
                </View>
                <Card
                    image={{ uri: product_image }}>
                    <Text style={{ marginBottom: 10 }}>
                        Mouthwatering perfection starts with two 100% pure beef patties and Big Mac® sauce sandwiched between a sesame seed bun. It’s topped off with pickles, crisp lettuce, onions and American cheese for a 100% beef burger with a taste like no other
                    </Text>
                </Card>
                <View style={{ flex: 1, width: '80%', padding: 20, paddingTop: 20, alignSelf: 'center'}}>
                    <Button
                        title="BRING ME THIS"
                        onPress={() => this.setState({productQtyVisible: true}) }
                        />
                </View>
            </View>
        )
    }

    renderView = () => {
        if(this.state.view == 'categories'){
            return this.renderProductCategories();
        }else if(this.state.view == 'products'){
            return this.renderProducts();
        }else if(this.state.view == 'product'){
            return this.renderProduct();
        }else{
            return this.renderProductCategories();
        }
    }

    qtyValueChange(text) {
        var newText = '';
        var numbers = '0123456789';
        if (text.length < 1) {
            this.setState({ qtyValue: '' });
        }
        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            this.setState({ qtyValue: newText });
        }
    }

    qtyValueChangeArrow(dir) {
        qty = Number(this.state.qtyValue)
        if (dir == 'left') {
            if (this.state.qtyValue <= 1) {
                return 0
            } else {
                qty = qty - 1
                this.setState({ qtyValue: qty })
            }
        }
        if (dir == 'right') {
            qty = qty + 1
            this.setState({ qtyValue: qty })
        }
    }

    render() {
        const partner_image = "https://www.mcdonalds.com/content/dam/usa/documents/mcdelivery/mcdelivery_new11.jpg"
        
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 30 }}>
                <Loader loading={this.state.loading} />
                <Overlay
                    isVisible={this.state.productQtyVisible}
                    windowBackgroundColor="rgba(255, 255, 255, .5)"
                    overlayBackgroundColor="#dfe6e9"
                    width="80%"
                    height="auto"
                    >
                    <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                       
                        <TouchableOpacity style={{width: 50}} onPress={ ()=>{ this.qtyValueChangeArrow('left') } }>
                            <Icon
                                name="chevron-left"
                                color="#0984e3"
                                size={50}
                            />
                        </TouchableOpacity>
                        <View style={{width: 100}} >
                            <Input
                                placeholder='Quantity'
                                onChangeText={ (qty)=>{ this.qtyValueChange(qty) } }
                                inputStyle={{textAlign: 'center'}}
                                value={`${this.state.qtyValue}`}
                                keyboardType='numeric'
                                maxLength={5}
                            />
                        </View>
                        <TouchableOpacity style={{width: 50}} onPress={ ()=>{ this.qtyValueChangeArrow('right') } } >
                            <Icon
                                name="chevron-right"
                                color="#0984e3"
                                size={50}
                            />
                        </TouchableOpacity>
      
                    </View>
                    <View  style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop:20 }}>
                    <Button
                        title="PLACE ORDER"
                        onPress={() => alert(this.state.qtyValue) }
                        />
                        <Button
                        title="CANCEL"
                        onPress={() => this.setState({ productQtyVisible: !this.state.productQtyVisible }) }
                        />
                    </View>
                    </View>
                    
                </Overlay>
                <Header
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: "McDelivery McDonald's", style: { color: '#fff' } }}
                />
                <ScrollView style={{  }}>
                    <Card
                        title="McDelivery McDonald's"
                        image={{ uri: partner_image }}>
                        <Text style={{ marginBottom: 10 }}>
                            McDelivery is a McDonald's service that delivers food to the customer's door.
                        </Text>
                    </Card>
                    <View style={{  }}>
                        {this.renderView(this.state.view)}
                    </View>
                </ScrollView>
            </View>
        );
    }
}