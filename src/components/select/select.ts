import Choices from "choices.js";
import Component, { ComponentProps } from "../../app/js/component";

// Icons
import sberbankLogo from "../../assets/icons/sber.svg";
import bitcoinLogo from "../../assets/icons/bitcoin.svg";
import etheriumLogo from "../../assets/icons/etherium.svg";
import payeerLogo from "../../assets/icons/payeer.svg";
import usdtLogo from "../../assets/icons/usdt.svg";
import symbiosLogo from "../../assets/icons/symbios.svg";

export default class Select extends Component.Default {
    nSelect: Choices;
    name: string;

    constructor(element: ComponentProps) {
        super(element);

        this.name = this.nRoot.querySelector("select").getAttribute("name");

        // Icons template
        const icons: {
            [key: string]: string;
        } = {
            sber: `<svg viewBox="${sberbankLogo.viewBox}" style="${this.getSvgSize(sberbankLogo)}">
                <use xlink:href="#${sberbankLogo.id}" />
            </svg>`,
            bitcoin: `<svg viewBox="${bitcoinLogo.viewBox}" style="${this.getSvgSize(bitcoinLogo)}">
                <use xlink:href="#${bitcoinLogo.id}" />
            </svg>`,
            etherium: `<svg viewBox="${etheriumLogo.viewBox}" style="${this.getSvgSize(etheriumLogo)}">
                <use xlink:href="#${etheriumLogo.id}" />
            </svg>`,
            payeer: `<svg viewBox="${payeerLogo.viewBox}" style="${this.getSvgSize(payeerLogo)}">
                <use xlink:href="#${payeerLogo.id}" />
            </svg>`,
            usdt: `<svg viewBox="${usdtLogo.viewBox}" style="${this.getSvgSize(usdtLogo)}">
                <use xlink:href="#${usdtLogo.id}" />
            </svg>`,
            symbios: `<svg viewBox="${symbiosLogo.viewBox}" style="${this.getSvgSize(symbiosLogo)}">
                <use xlink:href="#${symbiosLogo.id}" />
            </svg>`,
        };

        this.nSelect = new Choices(
            <HTMLSelectElement>this.getElement("choices"),
            {
                searchEnabled: false,
                callbackOnCreateTemplates: function (template) {
                    return {
                        item: (classNames, data) => {
                            return template(`
                              <div class="${classNames.item} ${
                                data.placeholder ? classNames.placeholder : ""
                            }" data-item data-id="${data.id}" data-value="${
                                data.value
                            }" ${data.active ? 'aria-selected="true"' : ""} ${
                                data.disabled ? 'aria-disabled="true"' : ""
                            }>
                                ${
                                    Object.keys(icons).includes(data.label)
                                        ? icons[data.label]
                                        : data.label
                                }
                              </div>
                            `);
                        },
                        choice: (classNames, data) => {
                            return template(`
                            <div class="${classNames.item} ${
                                classNames.itemChoice
                            } ${
                                data.disabled
                                    ? classNames.itemDisabled
                                    : classNames.itemSelectable
                            }" data-select-text="${
                                this.config.itemSelectText
                            }" data-choice ${
                                data.disabled
                                    ? 'data-choice-disabled aria-disabled="true"'
                                    : "data-choice-selectable"
                            } data-id="${data.id}" data-value="${data.value}" ${
                                data.groupId > 0
                                    ? 'role="treeitem"'
                                    : 'role="option"'
                            }>
                                ${
                                    Object.keys(icons).includes(data.label)
                                        ? icons[data.label]
                                        : data.label
                                }
                            </div>
                        `);
                        },
                    };
                },
            }
        );

        this.nSelect.passedElement.element.addEventListener(
            "showDropdown",
            this.onShowDropdown
        );
        this.nSelect.passedElement.element.addEventListener(
            "hideDropdown",
            this.onHideDropdown
        );
    }

    getSvgSize = ({ viewBox }: { viewBox: string }) => {
        const [_x, _y, width, height] = viewBox.split(' ');
        return `width: ${width}px; height: ${height}px`;
    }

    onShowDropdown = () => this.nRoot.classList.add("show");

    onHideDropdown = () => this.nRoot.classList.remove("show");

    destroy = () => {
        // Destroy functions
    };
}
