import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import BarberList from "../screens/BarberList";
import App from "../App";
import AppNavigator from "../App";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/BarberList">
                <BarberList/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/AppNavigator">
                <AppNavigator/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews