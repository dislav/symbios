import Component, {
    ComponentProps,
    getComponents,
} from "../../app/js/component";
import Select from "../select/select";

export default class TradeForm extends Component.Default {
    nSelects: Select[];

    constructor(element: ComponentProps) {
        super(element);

        this.nSelects = getComponents("select", this.nRoot).map(
            (component) => new Select(component)
        );
    }

    destroy = () => {
        // Destroy functions
    };
}
