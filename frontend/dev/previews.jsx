import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import BarberList from "../screens/BarberList";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/BarberList">
                <BarberList/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews